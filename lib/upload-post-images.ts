import { createClient } from "@/lib/supabase/server-client";

export async function uploadPostImages(files: File[], userId: string) {
  const supabase = await createClient();

  const uploadedUrls: string[] = [];

  for (const file of files) {
    /**
     * Validate image type
     */
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    /**
     * Validate file size
     */
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image must be under 5MB");
    }

    /**
     * Generate unique filename
     */
    const fileExt = file.name.split(".").pop();

    const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

    /**
     * Upload to Supabase Storage
     */
    const { error } = await supabase.storage
      .from("posts")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    /**
     * Get public URL
     */
    const { data } = supabase.storage.from("posts").getPublicUrl(filePath);

    uploadedUrls.push(data.publicUrl);
  }

  return uploadedUrls;
}
