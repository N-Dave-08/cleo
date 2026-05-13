import { getPostById } from "@/lib/queries/posts";
import { notFound } from "next/navigation";
import PostPageClient from "./_components/post-page-client";

type Props = {
  params: Promise<{ id: string }>;
};

type PostImage = {
  id: string;
  image_url: string;
  position: number;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  if (!id) return notFound();

  const post = await getPostById(id);

  if (!post) return notFound();

  const images =
    post.post_images?.length > 0
      ? (post.post_images as PostImage[])
          .sort((a, b) => a.position - b.position)
          .map((img) => img.image_url)
      : post.media_url
        ? [post.media_url]
        : [];

  return <PostPageClient post={post} images={images} />;
}
