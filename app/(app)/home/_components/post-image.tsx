import Image from "next/image";
import { cn } from "@/lib/utils";

interface PostImageProps {
  image?: string;
  className?: string;
  variant?: "feed" | "detail";
}

export default function PostImage({
  image,
  className,
  variant = "feed",
}: PostImageProps) {
  if (!image) return null;

  if (variant === "feed") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl bg-base-300 w-full",
          className,
        )}
      >
        <Image
          src={image}
          alt="Post"
          width={1200}
          height={1600}
          className="w-full h-auto object-contain"
        />
      </div>
    );
  }

  return (
    <Image
      src={image}
      alt="Post content"
      width={1200}
      height={1600}
      priority
      className={cn("h-full w-auto max-w-full object-contain", className)}
    />
  );
}
