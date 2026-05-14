import PostMedia from "@/app/(app)/home/_components/post-media";
import PostContent from "@/app/(app)/home/_components/post-content";
import PostActions from "@/app/(app)/home/_components/post-action";

type Props = {
  images: string[];
  content: string;

  postId: string;

  initialLiked: boolean;
  likeCount: number;
  commentCount: number;
};

export default function PostDetailBody({
  images,
  content,
  postId,
  initialLiked,
  likeCount,
  commentCount,
}: Props) {
  return (
    <>
      {/* IMAGE */}
      <div className="lg:h-full h-[40vh] bg-base-300">
        <PostMedia images={images} mode="detail" />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-3">
        <PostContent content={content} isDetailView />
      </div>

      {/* ACTIONS */}
      <div className="px-4 pb-3 border-b border-base-content/5">
        <PostActions
          postId={postId}
          initialLiked={initialLiked}
          likeCount={likeCount}
          commentCount={commentCount}
        />
      </div>
    </>
  );
}
