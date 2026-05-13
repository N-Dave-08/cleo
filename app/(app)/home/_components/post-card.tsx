import PostAvatar from "./post-avatar";
import PostContent from "./post-content";
import PostHeader from "./post-header";
import PostActions from "./post-action";
import { getAvatarUrl } from "@/lib/get-avatar-url";
import PostMedia from "./post-media";

interface PostCardProps {
  post: {
    id: string;
    content: string;
    created_at: string;

    profiles: {
      username: string;
      avatar_url: string | null;
    };

    post_images: {
      id: string;
      image_url: string;
      position: number;
    }[];
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex flex-col gap-2 p-4 border-b border-base-content/5">
      <div className="flex gap-2">
        <PostAvatar
          authorAvatar={getAvatarUrl(
            post.profiles.username,
            post.profiles.avatar_url,
          )}
        />

        <PostHeader
          authorUsername={post.profiles.username}
          date={new Date(post.created_at)}
        />
      </div>

      <PostMedia images={post.post_images} mode="feed" />

      <PostContent content={post.content} />

      <PostActions postId={post.id} />
    </div>
  );
}
