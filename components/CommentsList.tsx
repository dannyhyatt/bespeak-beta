import { CommentWithProfile, createComment, getComments } from "@/utils/supabase/api/comment";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { ActionButtonCSS } from "./CSSConsts";
import CommentDisplay from "./CommentDisplay";


export default function CommentList({ replyToId, postId } : { replyToId?: string | null, postId: string }) {

  const [comments, setComments] = useState<CommentWithProfile[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [commentText, setCommentText] = useState<string>('')

  const client = createClient()

  const init = async () => {

    const comments = await getComments(client, postId, replyToId ?? null)

    setComments(comments)
    setLoading(false)

  }

  useEffect(() => {
    
    init();

  }, [replyToId]);

  if(loading) return (<div className="ml-2">Loading...</div>);

  return (
    <div className="flex flex-col my-2">

      {
        comments.map((comment) => {
          return (
            <CommentDisplay comment={comment} key={`comment-${comment.id}`} />
          )
        }) 
      }
      
      <div className="flex justify-center gap-2 mb-2 mx-2 items-end">

        <ReactTextareaAutosize 
          className="flex-grow p-2 rounded-md border-2" placeholder="Write a comment..." maxRows={5}
          onChange={(e) => { setCommentText(e.target.value) }} value={commentText}
          onKeyDown={(e) => {
            console.log('key down', e.key, e.metaKey);
            if(e.key == 'Enter' && e.metaKey) {
              createComment(client, postId, replyToId ?? null, commentText).then(() => {
                setCommentText('')
                init()
              })
            }
          }}
        />

        <button 
          // transparent border t make it the same size as the textarea
          className={`${ActionButtonCSS} border-2 border-transparent`}
          onClick={() => {
            createComment(client, postId, replyToId ?? null, commentText).then(() => {
              setCommentText('')
              init()
            })
          }}
        >
          Comment
        </button>

      </div>

    </div>
  );

}