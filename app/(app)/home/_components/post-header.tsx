import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface PostHeaderProps {
  authorUsername: string;
  date: Date;
  className?: string;
}

export default function PostHeader({
  authorUsername,
  date,
  className,
}: PostHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-hidden whitespace-nowrap",
        className,
      )}
    >
      <span className="font-semibold text-base-content text-sm truncate">
        {authorUsername}
      </span>
      <div className="flex items-center gap-1 opacity-60">
        <span className="w-1 h-1 rounded-full bg-current self-center mx-0.5" />
        <span className="text-xs">{date.toLocaleDateString()}</span>
        <Globe className="w-4 h-4" />
      </div>
    </div>
  );
}
