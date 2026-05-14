import { createClient } from "@/lib/supabase/server";
import { getCurrentUserServer } from "../supabase/auth-server";
import type { Post } from "@/app/(app)/types";

/**
 * Get feed posts
 */
export async function getFeedPosts() {
  const supabase = await createClient();

  const user = await getCurrentUserServer();

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
      ),
      likes (user_id),
      comments(id)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return {
    posts: (data ?? []) as Post[],
    userId: user?.id ?? null,
  };
}

/**
 * Get single post
 */
export async function getPostById(id?: string): Promise<Post | null> {
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
      ),
      likes (user_id),
      comments (
        id,
        content,
        created_at,
        user_id,
        profiles (
          username,
          avatar_url
        )
      )
      `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
}

/**
 * Get comments
 */
export async function getComments(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(*)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
}

/**
 * Create comment
 */
export async function createComment(postId: string, content: string) {
  const supabase = await createClient();

  const user = await getCurrentUserServer();

  if (!user) return;

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    user_id: user.id,
    content,
  });

  if (error) throw error;
}
