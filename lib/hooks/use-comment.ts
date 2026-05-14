"use client";

import { useState, useTransition, useMemo } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { getCurrentUserClient } from "../supabase/auth-client";
import type { PostComment } from "@/app/(app)/types";

type OptimisticComment = PostComment & {
  tempId: string;
};

export function useComments(postId: string, initialComments: PostComment[]) {
  const supabase = getSupabaseBrowser();

  const [confirmed, setConfirmed] = useState<PostComment[]>(initialComments);

  const [optimistic, setOptimistic] = useState<OptimisticComment[]>([]);

  const [isPending, startTransition] = useTransition();

  /**
   * Merge + SORT ONCE (always newest first)
   */
  const comments = useMemo(() => {
    return [...confirmed, ...optimistic].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }, [confirmed, optimistic]);

  /**
   * LIVE COUNT (this fixes your refresh issue)
   */
  const count = confirmed.length + optimistic.length;

  async function addComment(content: string) {
    const tempId = crypto.randomUUID();
    const user = await getCurrentUserClient();

    if (!user) return;

    const optimisticComment: OptimisticComment = {
      id: tempId,
      tempId,
      content,
      created_at: new Date().toISOString(),
      user_id: user.id,
      profiles: {
        username: user.user_metadata?.username ?? "You",
        avatar_url: user.user_metadata?.avatar_url ?? null,
      },
    };

    // append ONLY (no prepend)
    setOptimistic((prev) => [...prev, optimisticComment]);

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

      // rollback optimistic
      setOptimistic((prev) => prev.filter((c) => c.tempId !== tempId));

      if (error || !data) return;

      // append confirmed
      setConfirmed((prev) => [...prev, data as PostComment]);
    });
  }

  return {
    comments,
    addComment,
    isPending,
    count,
  };
}
