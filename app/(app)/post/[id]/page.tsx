import { getPostById } from "@/lib/queries/posts";
import { notFound } from "next/navigation";
import PostImage from "../../home/_components/post-image";
import PostAvatar from "../../home/_components/post-avatar";
import { getAvatarUrl } from "@/lib/get-avatar-url";
import { Globe } from "lucide-react";
import PostContent from "../../home/_components/post-content";
import PostActions from "../../home/_components/post-action";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  if (!id) return notFound();

  const post = await getPostById(id);

  if (!post) return notFound();

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 w-full min-h-0",
        "lg:h-[calc(100vh-64px)]",
      )}
    >
      {/* LEFT IMAGE SECTION */}
      <div className="relative flex items-center justify-center overflow-hidden lg:col-span-8 h-[60vh] lg:h-full">
        {post.media_url && (
          <>
            <div
              className="absolute inset-0 scale-150 blur-lg opacity-40"
              style={{
                backgroundImage: `url(${post.media_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 w-full h-full p-8 lg:p-12 flex items-center justify-center">
              <PostImage image={post.media_url} variant="detail" />
            </div>
          </>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col min-h-0 lg:col-span-4 bg-base-100 border-l border-base-content/5">
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

        <div className="grow overflow-y-auto p-4 space-y-4">
          <PostContent content={post.content} isDetailView />

          <div className="pt-4 border-t border-base-content/5">
            <p className="text-xs opacity-40 italic">No comments yet...</p>
          </div>
        </div>

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
