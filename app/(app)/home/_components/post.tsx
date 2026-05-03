"use client";

import Image from "next/image";
import {
  Bookmark,
  Forward,
  Heart,
  LucideIcon,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PostData } from "@/data/posts";

interface ActionButton {
  name: string;
  count: number;
  icon: LucideIcon;
}

const actionButtons: ActionButton[] = [
  {
    name: "like",
    count: 487,
    icon: Heart,
  },
  {
    name: "comment",
    count: 12,
    icon: MessageCircle,
  },
  {
    name: "bookmark",
    count: 90,
    icon: Bookmark,
  },
];

export default function Post({
  id,
  authorAvatar,
  authorName,
  authorUsername,
  content,
  image,
  date,
}: PostData) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current && !isExpanded) {
        // Check if the text is actually wider than its container
        const hasOverflow =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTruncated(hasOverflow);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [content, isExpanded]);

  return (
    <Link
      href={`/post/${id}`}
      className="flex gap-2 p-4 hover:bg-base-content/5 cursor-pointer max-w-2xl"
      key={id}
    >
      {/* Left Column: Avatar */}
      <div className="shrink-0">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={authorAvatar} alt="avatar" />
          </div>
        </div>
      </div>

      {/* Right Column: Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Header: Name, Handle, and Time */}
        <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
          <span className="font-semibold text-base-content text-sm truncate">
            {authorName}
          </span>
          <div className="flex items-center gap-1 text-accent/60">
            <span className="text-sm truncate">{authorUsername}</span>
            {/* Custom weighted dot using the span method for precision */}
            <span className="w-1 h-1 rounded-full bg-current opacity-60 self-center mx-0.5" />
            <span className="text-sm">{date.toLocaleDateString()}</span>
          </div>
        </div>

        {/* 
         If NOT expanded: use flex to keep the button on the same line
         If EXPANDED:  use block to let text flow naturally downwards
      */}
        <div
          className={` text-sm ${!isExpanded ? "flex items-center gap-2" : ""}`}
        >
          <p
            ref={textRef}
            onClick={() => setIsExpanded((prev) => !prev)}
            className={`text-base-content  cursor-pointer ${
              !isExpanded ? "truncate" : "whitespace-pre-wrap"
            }`}
          >
            {content}
          </p>

          {isTruncated && !isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
              className=" font-semibold shrink-0 hover:link"
            >
              See more
            </button>
          )}
        </div>

        {/* Media: Post Image */}
        {image && (
          <div className="max-w-full border border-base-content/20 rounded-2xl overflow-hidden bg-base-200">
            <div className="relative w-full overflow-hidden">
              <Image
                alt="Post content"
                src={image}
                width={1200}
                height={675}
                className="w-full h-auto block object-cover "
              />
            </div>
          </div>
        )}

        {/* Action Buttons could go here (Reply, Like, etc.) */}
        <div className="flex justify-between">
          <div className="flex gap-6">
            {actionButtons.map((button) => (
              <div className="btn btn-xs btn-ghost" key={button.name}>
                <button.icon className="h-4 w-4" />
                <span>{button.count}</span>
              </div>
            ))}
          </div>

          <div className="btn btn-xs btn-ghost">
            <Forward className="h-4 w-4" />
            <span>34</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
