"use server";

import { createClient } from "@/lib/supabase/server-client";
import { uploadPostImages } from "@/lib/upload-post-images";
import { revalidatePath } from "next/cache";

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
  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File);

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

  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({ user_id: user.id, content })
    .select()
    .single();

  if (postError) {
    throw new Error(postError.message);
  }

  let uploadUrls: string[] = [];

  if (files.length > 0) {
    uploadUrls = await uploadPostImages(files, user.id);
  }

  if (uploadUrls.length > 0) {
    const imageRows = uploadUrls.map((url, index) => ({
      post_id: post.id,
      image_url: url,
      position: index,
    }));

    const { error: imagesError } = await supabase
      .from("post_images")
      .insert(imageRows);

    if (imagesError) {
      throw new Error(imagesError.message);
    }
  }
  revalidatePath("/home");
}
