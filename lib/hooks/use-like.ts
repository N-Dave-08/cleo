"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function useLike(
  postId: string,
  initialLiked: boolean,
  initialCount: number,
) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();

  function toggleLike() {
    const prevLiked = liked;
    const prevCount = count;

    // =========================
    // OPTIMISTIC UPDATE (FIXED)
    // =========================
    if (!prevLiked) {
      setLiked(true);
      setCount((c) => c + 1);
    } else {
      setLiked(false);
      setCount((c) => c - 1);
    }

    startTransition(async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        // rollback
        setLiked(prevLiked);
        setCount(prevCount);
        return;
      }

      // =========================
      // LIKE
      // =========================
      if (!prevLiked) {
        const { error } = await supabase.from("likes").insert({
          post_id: postId,
          user_id: user.id,
        });

        if (error) {
          console.error("Like error:", error);

          // rollback
          setLiked(prevLiked);
          setCount(prevCount);
        }
      }

      // =========================
      // UNLIKE
      // =========================
      else {
        const { error } = await supabase.from("likes").delete().match({
          post_id: postId,
          user_id: user.id,
        });

        if (error) {
          console.error("Unlike error:", error);

          // rollback
          setLiked(prevLiked);
          setCount(prevCount);
        }
      }
    });
  }

  return {
    liked,
    count,
    toggleLike,
    pending,
  };
}
