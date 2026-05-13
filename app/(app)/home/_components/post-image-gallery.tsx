"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface PostImageGalleryProps {
  images: {
    id: string;
    image_url: string;
    position: number;
  }[];
}

export default function PostImageGallery({ images }: PostImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (!images?.length) return null;

  /**
   * Sort images by position
   */
  const sortedImages = [...images].sort((a, b) => a.position - b.position);

  const isMultiple = sortedImages.length > 1;

  function prev() {
    setCurrent((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1));
  }

  function next() {
    setCurrent((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* IMAGE */}
      <div className="relative w-full bg-base-300">
        <Image
          src={sortedImages[current].image_url}
          alt={`Post image ${current + 1}`}
          width={1200}
          height={1200}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* LEFT BUTTON */}
      {isMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
        >
          <ChevronLeft className="size-4" />
        </button>
      )}

      {/* RIGHT BUTTON */}
      {isMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/50 border-none text-white hover:bg-black/70"
        >
          <ChevronRight className="size-4" />
        </button>
      )}

      {/* INDICATORS */}
      {isMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {sortedImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCurrent(index);
              }}
              className={`h-2 rounded-full transition-all ${
                current === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* IMAGE COUNT */}
      {isMultiple && (
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
          {current + 1}/{sortedImages.length}
        </div>
      )}
    </div>
  );
}
