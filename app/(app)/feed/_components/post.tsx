import Image from "next/image";
import { PostData } from "../_types/post";
import { Bookmark, Forward, Heart, MessageCircle } from "lucide-react";

interface ActionButton {}

const actionButtons = [
  {
    count: 487,
    icon: Heart,
  },
  {
    count: 12,
    icon: MessageCircle,
  },
  {
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
  return (
    <div className="flex gap-3 p-4  max-w-2xl" key={id}>
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

        {/* Post Body Text (Optional - added for layout context) */}
        <p className="text-base-content text-[15px] leading-normal mb-2">
          {content}
        </p>

        {/* Media: Post Image */}
        {image && (
          <div className="max-w-full border border-base-content/20 rounded-2xl overflow-hidden bg-base-200">
            <div className="relative w-full overflow-hidden">
              <Image
                alt="Post content"
                src={image}
                width={1200}
                height={675}
                className="w-full h-auto block object-cover hover:opacity-95 transition-opacity cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Action Buttons could go here (Reply, Like, etc.) */}
        <div className="flex justify-between">
          <div className="flex gap-6">
            {actionButtons.map((button) => (
              <div className="btn btn-xs btn-ghost">
                <button.icon key={crypto.randomUUID()} className="h-4 w-4" />
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
    </div>
  );
}
