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

  return <PostPageClient post={post} currentUserId={user?.id ?? null} />;
}
