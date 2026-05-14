import PostAvatar from "@/app/(app)/home/_components/post-avatar";
import { getAvatarUrl } from "@/lib/get-avatar-url";
import { Globe } from "lucide-react";

type Props = {
  username: string;
  avatarUrl: string | null;
  createdAt: string;
};

export default function PostDetailHeader({
  username,
  avatarUrl,
  createdAt,
}: Props) {
  return (
    <div className="p-4 flex items-center gap-2">
      <PostAvatar authorAvatar={getAvatarUrl(username, avatarUrl)} />

      <div className="min-w-0">
        <div className="text-sm font-semibold truncate">{username}</div>

        <div className="text-xs opacity-60 flex items-center gap-1">
          {new Date(createdAt).toLocaleDateString()}
          <Globe className="size-3" />
        </div>
      </div>
    </div>
  );
}
