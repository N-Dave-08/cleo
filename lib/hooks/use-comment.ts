"use client";

import { useState, useTransition } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { getCurrentUserClient } from "../supabase/auth-client";

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

  // 👇 optimistic tracking
  _optimistic?: boolean;
};

// =======================
// Supabase raw shape
// =======================
type SupabaseCommentRow = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: CommentProfile | CommentProfile[] | null | undefined;
};

// =======================
// Normalizer
// =======================
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

// =======================
// Hook
// =======================
export function useComments(postId: string, initialComments: Comment[]) {
  const supabase = getSupabaseBrowser();

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isPending, startTransition] = useTransition();

  async function addComment(content: string) {
    const tempId = crypto.randomUUID();

    const user = await getCurrentUserClient();

    if (!user) return;

    // =======================
    // OPTIMISTIC COMMENT
    // =======================
    const optimistic: Comment = {
      id: tempId,
      content,
      created_at: new Date().toISOString(),
      user_id: user.id,
      profiles: {
        username: user.user_metadata?.username ?? "You",
        avatar_url: user.user_metadata?.avatar_url ?? null,
      },
      _optimistic: true,
    };

    setComments((prev) => [optimistic, ...prev]);

    startTransition(async () => {
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

      // =======================
      // FAIL → rollback
      // =======================
      if (error || !data) {
        setComments((prev) =>
          prev.filter((c) => !(c._optimistic && c.id === tempId)),
        );
        return;
      }

      const normalized = normalizeComment(data as SupabaseCommentRow);

      // =======================
      // SUCCESS → replace optimistic
      // =======================
      setComments((prev) =>
        prev.map((c) => (c._optimistic && c.id === tempId ? normalized : c)),
      );
    });
  }

  return {
    comments,
    addComment,
    isPending,
  };
}
