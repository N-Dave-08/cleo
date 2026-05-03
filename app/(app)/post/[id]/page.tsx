import React from "react";
import Post from "../../home/_components/post";
import { postItems } from "@/data/posts";
import { notFound } from "next/navigation";

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
    <div>
      <Post {...post} />
    </div>
  );
}
