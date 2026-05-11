import { createClient } from "@/lib/supabase/server-client";

/**
 * Get feed posts (Home page)
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
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Get single post by ID (Post detail page)
 */
export async function getPostById(id?: string) {
  if (!id) {
    throw new Error("Post ID is required");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        username,
        avatar_url
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
