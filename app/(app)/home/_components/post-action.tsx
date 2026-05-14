"use client";

import { useLike } from "@/lib/hooks/use-like";
import { cn } from "@/lib/utils";
import { Bookmark, Forward, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

interface PostActionsProps {
  postId: string;
  initialLiked: boolean;
  likeCount: number;
  commentCount: number;
}

export default function PostActions({
  postId,
  initialLiked,
  likeCount,
  commentCount,
}: PostActionsProps) {
  const { liked, toggleLike, count } = useLike(postId, initialLiked, likeCount);

  return (
    <div className="flex justify-between">
      <div className="flex gap-3 items-center">
        {/* LIKE */}
        <button
          onClick={toggleLike}
          className="btn btn-xs btn-ghost flex items-center gap-1"
        >
          <Heart
            className={cn("size-[1.2rem]", {
              "fill-red-500 text-red-500": liked,
            })}
          />
          <span>{count}</span>
        </button>

        {/* COMMENTS */}
        <Link
          href={`/post/${postId}`}
          className="btn btn-xs btn-ghost flex items-center gap-1"
        >
          <MessageCircle className="size-[1.2rem]" />
          <span>{commentCount}</span>
        </Link>

        {/* BOOKMARK (placeholder for later) */}
        <button className="btn btn-xs btn-ghost">
          <Bookmark className="size-[1.2rem]" />
        </button>
      </div>

      <button className="btn btn-xs btn-ghost">
        <Forward className="size-[1.2rem]" />
        <span>Share</span>
      </button>
    </div>
  );
}
