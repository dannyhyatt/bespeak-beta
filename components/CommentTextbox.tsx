import { createComment } from "@/utils/supabase/api/comment";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { ActionButtonCSS } from "./CSSConsts";

export default function CommentTextbox({ onComment, className } : { onComment: (arg0: string) => Promise<void>, className?: string}){

  const [commentText, setCommentText] = useState<string>('')

  return (
    <div className={`flex shrink justify-center gap-2 mx-2 items-end ${className}`}>
      <ReactTextareaAutosize
        className="flex-grow p-2 rounded-md border-2 bg-background" placeholder="Write a comment..." maxRows={5}
        onChange={(e) => { setCommentText(e.target.value) }} value={commentText}
        onKeyDown={async (e) => {
          if(e.key == 'Enter' && e.metaKey) {
            await onComment(commentText)
            setCommentText('')
          }
        }}
      />

      <button 
        // transparent border t make it the same size as the textarea
        className={`${ActionButtonCSS} border-2 border-transparent`}
        onClick={async () => {
          await onComment(commentText)
          setCommentText('')
        }}
      >
        Comment
      </button>

    </div>
  );
}