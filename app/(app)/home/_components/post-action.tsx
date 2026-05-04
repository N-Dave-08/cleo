import {
  Bookmark,
  Forward,
  Heart,
  LucideIcon,
  MessageCircle,
} from "lucide-react";

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

export default function PostActions() {
  return (
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
  );
}
