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

  // ✅ server state (source of truth)
  const [confirmed, setConfirmed] = useState<PostComment[]>(initialComments);

  // ✅ UI-only temporary state
  const [optimistic, setOptimistic] = useState<OptimisticComment[]>([]);

  const [isPending, startTransition] = useTransition();

  /**
   * FINAL RENDER MODEL
   * Optimistic comments are treated as a separate UI layer
   */
  const comments = useMemo(() => {
    return [...optimistic, ...confirmed];
  }, [optimistic, confirmed]);

  async function addComment(content: string) {
    const tempId = crypto.randomUUID();
    const user = await getCurrentUserClient();

    if (!user) return;

    // =========================
    // CREATE OPTIMISTIC ITEM (UI ONLY)
    // =========================
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

    // add immediately to UI
    setOptimistic((prev) => [optimisticComment, ...prev]);

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

      /**
       * ❌ FAILURE
       * remove optimistic item completely
       */
      if (error || !data) {
        setOptimistic((prev) => prev.filter((c) => c.tempId !== tempId));
        return;
      }

      /**
       * ❌ REMOVE OPTIMISTIC FIRST (NO MERGE LOGIC)
       */
      setOptimistic((prev) => prev.filter((c) => c.tempId !== tempId));

      /**
       * ✔ ADD SERVER RESULT (SOURCE OF TRUTH)
       */
      setConfirmed((prev) => [data as PostComment, ...prev]);
    });
  }

  return {
    comments,
    addComment,
    isPending,
  };
}
