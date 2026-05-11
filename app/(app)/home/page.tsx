import { getFeedPosts } from "@/lib/queries/posts";
import PostCard from "./_components/post-card";

export default async function HomePage() {
  const posts = await getFeedPosts();

  return (
    <div className="w-full max-w-xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
