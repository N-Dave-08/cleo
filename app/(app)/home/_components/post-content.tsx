"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface PostContentProps {
  content: string;
  className?: string;
  isDetailView?: boolean;
}

export default function PostContent({
  content,
  className,
  isDetailView = false,
}: PostContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const contentRef = useRef<HTMLParagraphElement>(null);

  const shouldClamp = !isDetailView && !isExpanded;

  useEffect(() => {
    if (isDetailView) return;

    const el = contentRef.current;
    if (!el) return;

    // temporarily remove clamp to measure real height
    const isOverflowing = el.scrollHeight > el.clientHeight;

    setIsTruncated(isOverflowing);
  }, [content, isDetailView]);

  return (
    <div className="text-sm">
      <p
        ref={contentRef}
        className={cn(
          "text-base-content whitespace-pre-wrap",
          shouldClamp && "line-clamp-2",
          className,
        )}
      >
        {content}
      </p>

      {!isDetailView && isTruncated && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded((v) => !v);
          }}
          className="font-semibold hover:link mt-1"
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
