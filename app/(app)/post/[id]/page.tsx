import { postItems } from "@/data/posts";
import { notFound } from "next/navigation";
import PostAvatar from "../../home/_components/post-avatar";
import PostContent from "../../home/_components/post-content";
import PostImage from "../../home/_components/post-image";
import PostActions from "../../home/_components/post-action";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = postItems.find((p) => p.id === id);

  if (!post) return notFound();

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 w-full min-h-0",
        "lg:h-[calc(100vh-64px)]",
      )}
    >
      {/* Left Column: Occupies 8/12 of the screen */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden lg:col-span-8",
          "h-[60vh] lg:h-full",
        )}
      >
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 scale-150 blur-lg opacity-40"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Foreground Actual Image */}
        <div className="relative z-10 w-full h-full p-8 lg:p-12 flex items-center justify-center">
          <PostImage image={post.image} variant="detail" />
        </div>
      </div>

      {/* Right Column: Occupies 4/12 of the screen */}
      <div
        className={cn(
          "flex flex-col min-h-0 lg:col-span-4",
          "bg-base-100 border-l border-base-content/5",
        )}
      >
        {/* Author Header */}
        <div className="flex gap-2 p-4 border-b border-base-content/5">
          <PostAvatar authorAvatar={post.authorAvatar} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
              {post.authorUsername}
            </span>
            <div className="flex items-center gap-1 opacity-60">
              <span className="text-xs">{post.date.toLocaleDateString()}</span>
              <Globe className="size-3" />
            </div>
          </div>
        </div>

        {/* Scrollable Caption & Comments */}
        <div className="grow overflow-y-auto p-4 space-y-4">
          <PostContent content={post.content} isDetailView={true} />
          <div className="pt-4 border-t border-base-content/5">
            <p className="text-xs opacity-40 italic">No comments yet...</p>
          </div>
        </div>

        {/* Bottom Actions & Input */}
        <div className="p-4 border-t border-base-content/5 mt-auto">
          <PostActions />
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
