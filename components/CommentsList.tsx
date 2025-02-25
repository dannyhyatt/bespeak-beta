import { CommentWithProfile, createComment, getComments } from "@/utils/supabase/api/comment";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { ActionButtonCSS } from "./CSSConsts";
import CommentDisplay from "./CommentDisplay";
import CommentTextbox from "./CommentTextbox";


export default function CommentList({ replyToId, postId }: { replyToId?: string | null, postId: string }) {

  const [comments, setComments] = useState<CommentWithProfile[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const client = createClient()

  const init = async () => {

    const comments = await getComments(client, postId, replyToId ?? null)

    console.log('comments:::', comments)

    setComments(comments)
    setLoading(false)

  }

  useEffect(() => {

    init();

  }, [replyToId]);

  if (loading) return (<div className="ml-2">Loading...</div>);

  return (
    <div className="flex flex-col grow my-2 h-full">

      <span className="grow flex flex-col overflow-y-scroll">
        {
          comments.map((comment) => {
            return (
              <CommentDisplay comment={comment} key={`comment-${comment.id}`} />
            )
          })
        }
      </span>

      {!replyToId &&
        <CommentTextbox
          className="mb-4"
          onComment={async (commentText) => {
            await createComment(client, postId, replyToId ?? null, commentText);
            init();
          }}
        />
      }

    </div>
  );

}