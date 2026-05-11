import { createClient } from "@/lib/supabase/server-client";

export async function uploadPostImage(file: File, userId: string) {
  const supabase = await createClient();

  /**
   * SECURITY CHECK:
   * Ensure the uploaded file is actually an image.
   *
   * This prevents users from uploading:
   * - executables
   * - scripts
   * - non-media files
   */
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  /**
   * SIZE VALIDATION:
   * Prevent excessively large uploads that could:
   * - slow down storage
   * - increase bandwidth cost
   * - degrade performance
   *
   * Limit: 5MB per image
   */
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5MB");
  }

  /**
   * Extract file extension from original filename.
   *
   * Example:
   * "photo.png" → "png"
   */
  const fileExt = file.name.split(".").pop();

  /**
   * Generate unique file path for storage.
   *
   * Structure:
   * userId / randomUUID.extension
   *
   * Why:
   * - prevents filename collisions
   * - organizes uploads per user
   * - ensures uniqueness at scale
   */
  const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

  /**
   * Upload file to Supabase Storage bucket ("posts").
   *
   * Options:
   * - cacheControl: enables CDN caching for performance
   * - upsert: false prevents overwriting existing files
   */
  const { error } = await supabase.storage
    .from("posts")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  /**
   * If upload fails, immediately stop execution
   * and propagate error to the server action.
   */
  if (error) throw new Error(error.message);

  /**
   * Generate a public URL for the uploaded image.
   *
   * This URL is stored in the database and later used
   * to render the post image in the UI.
   */
  const { data } = supabase.storage.from("posts").getPublicUrl(filePath);

  return data.publicUrl;
}
