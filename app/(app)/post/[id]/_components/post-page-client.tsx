import PostCommentSection from "@/app/(app)/home/_components/post-comment-section";
import PostDetailBody from "@/app/(app)/home/_components/post-detail-body";
import PostDetailHeader from "@/app/(app)/home/_components/post-detail-header";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
};

type Post = {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
  likes: { user_id: string }[];
  comments: Comment[];
};

export default function PostPageClient({
  post,
  images,
  currentUserId,
}: {
  post: Post;
  images: string[];
  currentUserId: string | null;
}) {
  const likeCount = post.likes.length;

  const initialLiked =
    !!currentUserId && post.likes.some((l) => l.user_id === currentUserId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-0">
      {/* LEFT: MEDIA */}
      <div className="lg:col-span-8">
        <PostDetailBody
          images={images}
          content={post.content}
          postId={post.id}
          initialLiked={initialLiked}
          likeCount={likeCount}
          commentCount={post.comments.length}
        />
      </div>

      {/* RIGHT: DETAILS */}
      <div className="lg:col-span-4 flex flex-col min-h-0 bg-base-100">
        <PostDetailHeader
          username={post.profiles.username}
          avatarUrl={post.profiles.avatar_url}
          createdAt={post.created_at}
        />

        <PostCommentSection postId={post.id} initialComments={post.comments} />
      </div>
    </div>
  );
}
