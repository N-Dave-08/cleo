import { postItems } from "@/data/posts";
import { notFound } from "next/navigation";
import PostAvatar from "../../home/_components/post-avatar";
import PostContent from "../../home/_components/post-content";
import PostImage from "../../home/_components/post-image";
import PostActions from "../../home/_components/post-action";
import PostHeader from "../../home/_components/post-header";
import { Globe } from "lucide-react";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = postItems.find((p) => p.id === id);

  if (!post) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-2 p-4 max-w-2xl">
      <div className="flex gap-2">
        <PostAvatar authorAvatar={post.authorAvatar} />
        <div className="flex flex-col">
          <span className="font-semibold text-base-content text-sm leading-tight">
            {post.authorUsername}
          </span>
          <div className="flex gap-1 items-center opacity-60">
            <span className="text-xs">{post.date.toLocaleDateString()}</span>
            <span className="w-1 h-1 rounded-full bg-current self-center mx-0.5" />
            <Globe className="w-4 h-4" />
          </div>
        </div>
      </div>
      {/* <div className="bg-red-500 flex">
        <PostAvatar authorAvatar={post.authorAvatar} />
        <PostHeader
          authorUsername={post.authorUsername}
          date={post.date}
          className="flex-col"
        />
      </div> */}
      <PostContent
        content={post.content}
        className="text-sm sm:text-md md:text-lg"
        isDetailView={true}
      />
      <PostImage image={post.image} />
      <PostActions />
    </div>
  );
}
