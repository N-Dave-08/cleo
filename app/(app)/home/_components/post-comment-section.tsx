"use client";

import { useComments } from "@/lib/hooks/use-comment";

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

type Props = {
  postId: string;
  initialComments: Comment[];
};

export default function PostCommentSection({ postId, initialComments }: Props) {
  const { comments, addComment, isPending } = useComments(
    postId,
    initialComments,
  );

  return (
    <>
      {/* COMMENTS */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-4">
        {comments.length === 0 ? (
          <div className="text-xs opacity-40 text-center py-10">
            No comments yet
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="text-sm">
              <div className="text-xs font-semibold opacity-60 mb-1">
                {c.profiles?.username ?? "User"}
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{c.content}</p>
            </div>
          ))
        )}
      </div>

      {/* INPUT */}
      <div className="border-t border-base-content/5 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const input = e.currentTarget.comment as HTMLInputElement;
            if (!input.value.trim()) return;

            addComment(input.value);
            input.value = "";
          }}
          className="flex gap-2"
        >
          <input
            name="comment"
            className="input input-sm flex-1"
            placeholder="Write a comment..."
          />

          <button disabled={isPending} className="btn btn-sm btn-primary">
            {isPending ? "..." : "Post"}
          </button>
        </form>
      </div>
    </>
  );
}
