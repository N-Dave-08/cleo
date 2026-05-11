import Image from "next/image";

interface PostAvatarProps {
  authorAvatar: string;
}

export default function PostAvatar({ authorAvatar }: PostAvatarProps) {
  return (
    <div className="shrink-0">
      <div className="avatar">
        <div className="w-10 h-10 relative rounded-full ring-1 ring-base-content/10">
          <Image
            fill
            sizes="40px"
            unoptimized
            src={authorAvatar}
            alt="avatar"
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
