import { createClient } from "@/lib/supabase/server-client";
import { notFound } from "next/navigation";

import PostAvatar from "../../home/_components/post-avatar";
import PostContent from "../../home/_components/post-content";
import PostImage from "../../home/_components/post-image";
import PostActions from "../../home/_components/post-action";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAvatarUrl } from "@/lib/get-avatar-url";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles (
        username,
        avatar_url
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    return notFound();
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 w-full min-h-0",
        "lg:h-[calc(100vh-64px)]",
      )}
    >
      {/* LEFT IMAGE SECTION */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden lg:col-span-8",
          "h-[60vh] lg:h-full",
        )}
      >
        {post.media_url && (
          <>
            {/* BLURRED BACKGROUND */}
            <div
              className="absolute inset-0 scale-150 blur-lg opacity-40"
              style={{
                backgroundImage: `url(${post.media_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* MAIN IMAGE */}
            <div className="relative z-10 w-full h-full p-8 lg:p-12 flex items-center justify-center">
              <PostImage image={post.media_url} variant="detail" />
            </div>
          </>
        )}
      </div>

      {/* RIGHT CONTENT SECTION */}
      <div
        className={cn(
          "flex flex-col min-h-0 lg:col-span-4",
          "bg-base-100 border-l border-base-content/5",
        )}
      >
        {/* AUTHOR */}
        <div className="flex gap-2 p-4 border-b border-base-content/5">
          <PostAvatar
            authorAvatar={getAvatarUrl(
              post.profiles.username,
              post.profiles.avatar_url,
            )}
          />

          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
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
          <PostContent content={post.content} isDetailView={true} />

          <div className="pt-4 border-t border-base-content/5">
            <p className="text-xs opacity-40 italic">No comments yet...</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-4 border-t border-base-content/5 mt-auto">
          <PostActions postId={post.id} />

          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="input input-ghost input-sm w-full"
            />

            <button className="btn btn-ghost btn-sm text-primary font-bold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
