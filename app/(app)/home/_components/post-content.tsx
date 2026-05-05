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
  /**
   * Controls whether the user has expanded the text manually
   * false = collapsed (clamped)
   * true = fully expanded
   */
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Controls whether the content actually overflows its container
   * If false → no need to show "See more" button
   */
  const [isTruncated, setIsTruncated] = useState(false);

  /**
   * Reference to the actual DOM <p> element
   * Needed because we must measure real rendered height in the browser
   */
  const contentRef = useRef<HTMLParagraphElement>(null);

  /**
   * Determines whether we apply line-clamp or not
   *
   * Conditions:
   * - Detail page → always full text (no clamp)
   * - Expanded → full text (no clamp)
   * - Otherwise → clamp text
   */
  const shouldClamp = !isDetailView && !isExpanded;

  /**
   * Runs AFTER the component renders in the browser
   *
   * IMPORTANT:
   * We cannot measure scrollHeight during render because layout is not ready yet.
   * useEffect ensures DOM is fully painted before measuring.
   */
  useEffect(() => {
    // Do nothing if this is a detail page (no truncation behavior needed)
    if (isDetailView) return;

    const el = contentRef.current;
    if (!el) return;

    /**
     * DOM measurement logic:
     *
     * scrollHeight = full height of content (including hidden overflow)
     * clientHeight = visible height of element
     *
     * If scrollHeight > clientHeight → content is being cut off (truncated)
     */
    const isOverflowing = el.scrollHeight > el.clientHeight;

    // Save result so we can decide whether to show "See more"
    setIsTruncated(isOverflowing);
  }, [content, isDetailView]);

  return (
    <div className="text-sm">
      <p
        ref={contentRef}
        className={cn(
          "text-base-content whitespace-pre-wrap",

          /**
           * Apply Tailwind line-clamp only when:
           * - not expanded
           * - not detail view
           *
           * line-clamp-2 limits text to 2 lines visually
           */
          shouldClamp && "line-clamp-2",

          className,
        )}
      >
        {content}
      </p>

      {/**
       * Show "See more / See less" ONLY when:
       * 1. NOT in detail view
       * 2. Content actually overflows (is truncated)
       *
       * This prevents showing the button on short posts
       */}
      {!isDetailView && isTruncated && (
        <button
          onClick={(e) => {
            // Prevent parent click handlers (like opening post modal)
            e.preventDefault();
            e.stopPropagation();

            // Toggle expanded state
            setIsExpanded((prev) => !prev);
          }}
          className="font-semibold hover:link mt-1"
        >
          {/* Dynamic label based on state */}
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
