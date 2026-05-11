"use server";

import { createClient } from "@/lib/supabase/server-client";
import { uploadPostImage } from "@/lib/upload-post-image";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  /**
   * Extract text content from the submitted form.
   *
   * formData.get(...) can return:
   * - string
   * - File
   * - null
   *
   * We convert it safely into a string.
   */
  const content = formData.get("content")?.toString() || "";

  /**
   * Retrieve the uploaded image file from the form.
   *
   * Since FormData values are typed broadly,
   * we manually assert it as File | null.
   */
  const file = formData.get("image") as File | null;

  /**
   * Retrieve the currently authenticated user
   * from the Supabase server session.
   *
   * This ensures the post is tied to the logged-in user.
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**
   * Prevent unauthenticated users
   * from creating posts.
   */
  if (!user) throw new Error("Unauthorized");

  /**
   * This will store the uploaded image URL
   * after uploading to Supabase Storage.
   *
   * Default is null because posts may contain
   * text only without an image.
   */
  let mediaUrl: string | null = null;

  /**
   * Upload image ONLY if a file exists.
   *
   * uploadPostImage handles:
   * - generating unique file names
   * - uploading to storage bucket
   * - returning the public URL
   */
  if (file) {
    mediaUrl = await uploadPostImage(file, user.id);
  }

  /**
   * Insert the new post into the database.
   *
   * We store:
   * - the authenticated user's id
   * - post text content
   * - optional uploaded image URL
   */
  const { error } = await supabase.from("posts").insert({
    user_id: user.id,
    content,
    media_url: mediaUrl,
  });

  /**
   * Surface database errors to the client
   * so they can be handled properly.
   */
  if (error) throw new Error(error.message);
}
