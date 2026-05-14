"use client";

import { Globe } from "lucide-react";

import PostAvatar from "@/app/(app)/home/_components/post-avatar";
import PostContent from "@/app/(app)/home/_components/post-content";
import PostActions from "@/app/(app)/home/_components/post-action";
import PostMedia from "@/app/(app)/home/_components/post-media";
import { getAvatarUrl } from "@/lib/get-avatar-url";
import { useComments } from "@/lib/hooks/use-comment";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
};

type Post = {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
  likes: { user_id: string }[];
  comments: Comment[];
};

export default function PostPageClient({
  post,
  images,
  currentUserId,
}: {
  post: Post;
  images: string[];
  currentUserId: string | null;
}) {
  const { comments, addComment, isPending } = useComments(
    post.id,
    post.comments,
  );

  const likeCount = post.likes.length;

  const initialLiked =
    !!currentUserId && post.likes.some((l) => l.user_id === currentUserId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-0">
      {/* ================= IMAGE (LEFT) ================= */}
      <div className="lg:col-span-8 h-[40vh] lg:h-full bg-base-300">
        <PostMedia images={images} mode="detail" />
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="lg:col-span-4 flex flex-col min-h-0 bg-base-100">
        {/* ===== HEADER ===== */}
        <div className="p-4 flex items-center gap-2">
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
        <div className="px-4 pb-3">
          <PostContent content={post.content} isDetailView />
        </div>

        {/* ===== ACTIONS (ONLY ONCE) ===== */}
        <div className="px-4 pb-3 border-b border-base-content/5">
          <PostActions
            postId={post.id}
            initialLiked={initialLiked}
            likeCount={likeCount}
            commentCount={comments.length}
          />
        </div>

        {/* ===== COMMENTS (SCROLL AREA) ===== */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4">
          {comments.length === 0 ? (
            <div className="text-xs opacity-40 text-center py-10">
              No comments yet
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="text-sm">
                <div className="text-xs font-semibold opacity-60 mb-1">
                  {c.profiles?.username ?? "User"}
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* ===== COMMENT INPUT (STICKY BOTTOM FEEL) ===== */}
        <div className="border-t border-base-content/5 p-3">
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
