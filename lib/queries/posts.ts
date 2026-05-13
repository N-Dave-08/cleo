import { createClient } from "@/lib/supabase/server-client";

/**
 * Get feed posts
 */
export async function getFeedPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        username,
        avatar_url
      ),
      post_images (
        id,
        image_url,
        position
      )
    `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Get single post
 */
export async function getPostById(id?: string) {
  if (!id) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        username,
        avatar_url
      ),
      post_images (
        id,
        image_url,
        position
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
