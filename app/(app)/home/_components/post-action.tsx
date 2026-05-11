import {
  Bookmark,
  Forward,
  Heart,
  LucideIcon,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

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
    name: "bookmark",
    count: 90,
    icon: Bookmark,
  },
];

interface PostActionsProps {
  postId: string;
}

export default function PostActions({ postId }: PostActionsProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {actionButtons.map((button) => (
          <div className="btn btn-xs btn-ghost" key={button.name}>
            <button.icon className="size-[1.2rem]" />
            <span>{button.count}</span>
          </div>
        ))}

        <Link href={`/post/${postId}`} className="btn btn-xs btn-ghost">
          <MessageCircle className="size-[1.2rem]" />
          <span>12</span>
        </Link>
      </div>

      <div className="btn btn-xs btn-ghost">
        <Forward className="size-[1.2rem]" />
        <span>34</span>
      </div>
    </div>
  );
}
