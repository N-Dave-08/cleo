import { getPostById } from "@/lib/queries/posts";
import { notFound } from "next/navigation";
import PostPageClient from "./_components/post-page-client";
import { getCurrentUserServer } from "@/lib/supabase/auth-server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  const user = await getCurrentUserServer();

  const post = await getPostById(id);

  if (!post) return notFound();

  const images =
    post.post_images?.length > 0
      ? post.post_images
          .sort((a, b) => a.position - b.position)
          .map((img) => img.image_url)
      : [];

  return (
    <PostPageClient
      post={post}
      images={images}
      currentUserId={user?.id ?? null}
    />
  );
}
