"use client";

import Post from "./_components/post";
import { postItems } from "@/data/posts";

export default function FeedPage() {
  return (
    <>
      {/* Main Post Container */}
      {postItems.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          authorAvatar={post.authorAvatar}
          authorName={post.authorName}
          authorUsername={post.authorUsername}
          content={post.content}
          image={post.image}
          date={post.date}
        />
      ))}
    </>
  );
}
