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
    <>
      {/* Main Post Container */}
      {postItems.map((post) => (
        <Link
          href={`/post/${post.id}`}
          className="flex gap-2 p-4 hover:bg-base-content/5 cursor-pointer max-w-2xl"
          key={post.id}
        >
          {/* Left Column: Avatar */}
          <PostAvatar authorAvatar={post.authorAvatar} />

          {/* Right Column: Content Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            {/* Header: Name, Handle, and Time */}
            <PostHeader authorUsername={post.authorUsername} date={post.date} />

            {/* Content */}
            <PostContent content={post.content} />

            {/* Media: Post Image */}
            <PostImage image={post.image} />

            {/* Action Buttons */}
            <PostActions />
          </div>
        </Link>
      ))}
    </>
  );
}
