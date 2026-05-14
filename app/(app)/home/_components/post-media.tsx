"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageItem =
  | string
  | {
      id?: string;
      image_url: string;
      position?: number;
    };

interface PostMediaProps {
  images: ImageItem[];
  mode?: "feed" | "detail";
}

export default function PostMedia({ images, mode = "feed" }: PostMediaProps) {
  const [current, setCurrent] = useState(0);

  if (!images?.length) return null;

  const normalized = images
    .map((img) => (typeof img === "string" ? img : img.image_url))
    .filter(Boolean);

  const isMultiple = normalized.length > 1;
  const lastIndex = normalized.length - 1;

  const canGoPrev = current > 0;
  const canGoNext = current < lastIndex;

  const active = normalized[current];

  function prev() {
    if (!canGoPrev) return;
    setCurrent((p) => p - 1);
  }

  function next() {
    if (!canGoNext) return;
    setCurrent((p) => p + 1);
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden h-full",
        mode === "feed" && " rounded-xl",
      )}
    >
      {/* ================= FEED MODE ================= */}
      {mode === "feed" && (
        <div className="relative overflow-hidden rounded-xl aspect-4/5 bg-base-300">
          {/* SLIDER TRACK */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${normalized.length * 100}%`,
              transform: `translateX(-${current * (100 / normalized.length)}%)`,
            }}
          >
            {normalized.map((img, index) => (
              <div
                key={index}
                className="relative h-full shrink-0"
                style={{
                  width: `${100 / normalized.length}%`,
                }}
              >
                <Image
                  src={img}
                  alt={`post-image-${index}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* NAVIGATION */}
          {isMultiple && (
            <>
              {canGoPrev && (
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-xs bg-black/60 text-white z-20"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}

              {canGoNext && (
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-xs bg-black/60 text-white z-20"
                >
                  <ChevronRight className="size-4" />
                </button>
              )}
            </>
          )}

          {/* IMAGE COUNT */}
          {isMultiple && (
            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-black/60 text-white text-xs z-20">
              {current + 1}/{normalized.length}
            </div>
          )}
        </div>
      )}
      {/* ================= DETAIL MODE ================= */}
      {mode === "detail" && (
        <div className="relative w-full h-full">
          {/* BLURRED BACKGROUND  */}
          <div
            key={active}
            className="absolute inset-0 scale-150 blur-lg opacity-40 transition-all duration-500"
            style={{
              backgroundImage: `url(${active})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/40" />

          {/* SLIDE TRACK */}
          <div className="relative z-10 flex items-center justify-center h-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * 100}%)`,
                width: `${normalized.length * 100}%`,
              }}
            >
              {normalized.map((img, i) => (
                <div
                  key={i}
                  className="w-full flex items-center justify-center shrink-0"
                >
                  <Image
                    src={img}
                    alt={`post-image-${i}`}
                    width={1200}
                    height={1200}
                    className="max-h-[80vh] w-auto object-contain rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* NAV BUTTONS */}
          {isMultiple && (
            <>
              {canGoPrev && (
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/60 text-white z-20"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}

              {canGoNext && (
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-black/60 text-white z-20"
                >
                  <ChevronRight className="size-4" />
                </button>
              )}
            </>
          )}

          {/* DOT INDICATORS */}
          {isMultiple && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-20">
              {normalized.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    current === i ? "w-6 bg-white" : "w-2 bg-white/50",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
