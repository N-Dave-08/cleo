"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

export type CommentProfile = {
  username: string;
  avatar_url: string | null;
};

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: CommentProfile | null;
};

// Supabase raw shape (strict but flexible)
type SupabaseCommentRow = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: CommentProfile | CommentProfile[] | null | undefined;
};

// normalize Supabase response (NO any)
function normalizeComment(row: SupabaseCommentRow): Comment {
  const profileRaw = Array.isArray(row.profiles)
    ? row.profiles[0]
    : row.profiles;

  return {
    id: row.id,
    content: row.content,
    created_at: row.created_at,
    user_id: row.user_id,
    profiles: profileRaw
      ? {
          username: profileRaw.username,
          avatar_url: profileRaw.avatar_url ?? null,
        }
      : null,
  };
}

export function useComments(postId: string, initialComments: Comment[]) {
  const supabase = createClient();

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isPending, startTransition] = useTransition();

  async function addComment(content: string) {
    const tempId = crypto.randomUUID();

    const optimistic: Comment = {
      id: tempId,
      content,
      created_at: new Date().toISOString(),
      user_id: "temp",
      profiles: {
        username: "You",
        avatar_url: null,
      },
    };

    setComments((prev) => [optimistic, ...prev]);

    startTransition(async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      const user = userData?.user;

      if (userError || !user) {
        setComments((prev) => prev.filter((c) => c.id !== tempId));
        return;
      }

      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: postId,
          content,
          user_id: user.id,
        })
        .select(
          `
          id,
          content,
          created_at,
          user_id,
          profiles (
            username,
            avatar_url
          )
        `,
        )
        .single();

      if (error || !data) {
        console.error(error);
        setComments((prev) => prev.filter((c) => c.id !== tempId));
        return;
      }

      // normalize safely (NO any)
      const normalized = normalizeComment(data as SupabaseCommentRow);

      setComments((prev) =>
        prev.map((c) => (c.id === tempId ? normalized : c)),
      );
    });
  }

  return {
    comments,
    addComment,
    isPending,
  };
}
