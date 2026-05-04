import { postItems } from "@/data/posts";
import { notFound } from "next/navigation";
import PostAvatar from "../../home/_components/post-avatar";
import PostContent from "../../home/_components/post-content";
import PostImage from "../../home/_components/post-image";
import PostActions from "../../home/_components/post-action";

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
          <span className="font-semibold text-md">{post.authorName}</span>
          <span className="text-sm text-accent/60 leading-tight">
            {post.authorUsername}
          </span>
        </div>
      </div>
      {/* <PostHeader
        authorName={post.authorName}
        authorUsername={post.authorUsername}
        date={post.date}
      /> */}
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
