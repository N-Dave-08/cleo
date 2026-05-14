"use client";

import { Globe } from "lucide-react";

import PostAvatar from "@/app/(app)/home/_components/post-avatar";
import PostContent from "@/app/(app)/home/_components/post-content";
import PostActions from "@/app/(app)/home/_components/post-action";
import PostMedia from "@/app/(app)/home/_components/post-media";

import { getAvatarUrl } from "@/lib/get-avatar-url";
import { useComments } from "@/lib/hooks/use-comment";
import type { Post } from "@/app/(app)/types";

export default function PostPageClient({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId: string | null;
}) {
  /**
   * COMMENTS
   */
  const { comments, addComment, isPending } = useComments(
    post.id,
    post.comments,
  );

  /**
   * LIKES
   */
  const likeCount = post.likes.length;

  const initialLiked =
    !!currentUserId && post.likes.some((l) => l.user_id === currentUserId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-0 overflow-hidden">
      {/* ================= LEFT / MEDIA ================= */}
      <div className="lg:col-span-8 h-[40vh] lg:h-full bg-base-300">
        <PostMedia images={post.post_images} mode="detail" />
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="lg:col-span-4 flex flex-col h-full min-h-0 bg-base-100">
        {/* ===== HEADER ===== */}
        <div className="p-4 flex items-center gap-2 border-b border-base-content/5 shrink-0">
          <PostAvatar
            authorAvatar={getAvatarUrl(
              post.profiles.username,
              post.profiles.avatar_url,
            )}
          />

          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">
              {post.profiles.username}
            </div>

            <div className="text-xs opacity-60 flex items-center gap-1">
              {new Date(post.created_at).toLocaleDateString()}
              <Globe className="size-3" />
            </div>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="px-4 py-3 shrink-0">
          <PostContent content={post.content} isDetailView />
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="px-4 pb-3 border-b border-base-content/5 shrink-0">
          <PostActions
            postId={post.id}
            initialLiked={initialLiked}
            likeCount={likeCount}
            commentCount={post.comments.length}
          />
        </div>

        {/* ===== COMMENTS ===== */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4">
          {comments.length === 0 ? (
            <div className="text-xs opacity-40 text-center py-10">
              No comments yet
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="text-sm">
                <div className="text-xs font-semibold opacity-60 mb-1">
                  {comment.profiles?.username ?? "User"}
                </div>

                <p className="whitespace-pre-wrap leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* ===== INPUT ===== */}
        <div className="border-t border-base-content/5 p-3 shrink-0 bg-base-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const input = e.currentTarget.comment as HTMLInputElement;

              if (!input.value.trim()) return;

              addComment(input.value);

              input.value = "";
            }}
            className="flex gap-2"
          >
            <input
              name="comment"
              className="input input-sm flex-1"
              placeholder="Write a comment..."
            />

            <button disabled={isPending} className="btn btn-sm btn-primary">
              {isPending ? "..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
