"use client";

import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

import PostAvatar from "@/app/(app)/home/_components/post-avatar";
import PostContent from "@/app/(app)/home/_components/post-content";
import PostActions from "@/app/(app)/home/_components/post-action";
import { getAvatarUrl } from "@/lib/get-avatar-url";
import PostMedia from "@/app/(app)/home/_components/post-media";

type Post = {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
};

export default function PostPageClient({
  post,
  images,
}: {
  post: Post;
  images: string[];
}) {
  if (!images.length) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 w-full min-h-0",
        "lg:h-[calc(100vh-64px)]",
      )}
    >
      {/* LEFT IMAGE SECTION */}
      <div className="relative overflow-hidden lg:col-span-8 h-[60vh] lg:h-full">
        <PostMedia images={images} mode="detail" />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col min-h-0 lg:col-span-4 bg-base-100 border-l border-base-content/5">
        {/* HEADER */}
        <div className="flex gap-2 p-4 border-b border-base-content/5">
          <PostAvatar
            authorAvatar={getAvatarUrl(
              post.profiles.username,
              post.profiles.avatar_url,
            )}
          />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {post.profiles.username}
            </span>

            <div className="flex items-center gap-1 opacity-60">
              <span className="text-xs">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <Globe className="size-3" />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grow overflow-y-auto p-4 space-y-4">
          <PostContent content={post.content} isDetailView />

          <div className="pt-4 border-t border-base-content/5">
            <p className="text-xs opacity-40 italic">No comments yet...</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-4 border-t border-base-content/5 mt-auto">
          <PostActions postId={post.id} />
        </div>
      </div>
    </div>
  );
}
