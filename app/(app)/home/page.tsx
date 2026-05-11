import { createClient } from "@/lib/supabase/server-client";
import PostCard from "./_components/post-card";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
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
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return <div className="p-4">Failed to load posts</div>;
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
