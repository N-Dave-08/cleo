"use client";

import Link from "next/link";
import { postItems } from "@/data/posts";
import PostAvatar from "./_components/post-avatar";
import PostHeader from "./_components/post-header";
import PostContent from "./_components/post-content";
import PostImage from "./_components/post-image";
import PostActions from "./_components/post-action";

export default function HomePage() {
  return (
    <div className="w-full max-w-xl mx-auto">
      {" "}
      {/* Added mx-auto for centering */}
      {postItems.map((post) => (
        <Link
          href={`/post/${post.id}`}
          className="flex flex-col gap-2 p-4 hover:bg-base-content/5 cursor-pointer border-b border-base-content/5"
          key={post.id}
        >
          <div className="flex gap-2">
            <PostAvatar authorAvatar={post.authorAvatar} />
            <PostHeader authorUsername={post.authorUsername} date={post.date} />
          </div>

          <div className="w-full">
            <PostImage
              image={post.image}
              className="relative h-auto min-h-50"
            />
          </div>

          <PostContent content={post.content} />
          <PostActions />
        </Link>
      ))}
    </div>
  );
}
