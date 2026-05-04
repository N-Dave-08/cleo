import Image from "next/image";

interface PostAvatarProps {
  authorAvatar: string;
}

export default function PostAvatar({ authorAvatar }: PostAvatarProps) {
  return (
    <div className="shrink-0">
      <div className="avatar">
        <div className="w-10 h-10 relative rounded-full">
          <Image fill src={authorAvatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
}
