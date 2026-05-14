import PostAvatar from "./post-avatar";
import PostContent from "./post-content";
import PostActions from "./post-action";
import { getAvatarUrl } from "@/lib/get-avatar-url";
import PostMedia from "./post-media";
import PostHeader from "./post-header";
import type { Post } from "../../types";

interface PostCardProps {
  post: Post;
  currentUserId: string | null;
}

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const likeCount = post.likes?.length ?? 0;

  const commentCount = post.comments.length;

  const initialLiked =
    !!currentUserId &&
    post.likes?.some((like) => like.user_id === currentUserId);

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

      <PostActions
        postId={post.id}
        initialLiked={initialLiked}
        likeCount={likeCount}
        commentCount={post.comments.length}
      />
    </div>
  );
}
