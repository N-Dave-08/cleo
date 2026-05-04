"use client";

import Link from "next/link";
import { PostData } from "@/data/posts";
import PostAvatar from "./post-avatar";
import PostHeader from "./post-header";
import PostContent from "./post-content";
import PostImage from "./post-image";
import PostActions from "./post-action";

export default function Post({
  id,
  authorAvatar,
  authorUsername,
  content,
  image,
  date,
}: PostData) {
  return (
    <Link
      href={`/post/${id}`}
      className="flex gap-2 p-4 hover:bg-base-content/5 cursor-pointer max-w-2xl"
      key={id}
    >
      {/* Left Column: Avatar */}
      <PostAvatar authorAvatar={authorAvatar} />

      {/* Right Column: Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Header: Name, Handle, and Time */}
        <PostHeader authorUsername={authorUsername} date={date} />

        {/* Content */}
        <PostContent content={content} />

        {/* Media: Post Image */}
        <PostImage image={image} />

        {/* Action Buttons */}
        <PostActions />
      </div>
    </Link>
  );
}
