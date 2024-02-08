import { CommentWithProfile, createComment } from "@/utils/supabase/api/comment";
import { ButtonCSS, LinkCSS } from "./CSSConsts";
import { useState } from "react";
import Link from "next/link";
import { IconArrowBackUp, IconMessageReply } from "@tabler/icons-react";
import ReactTextareaAutosize from "react-textarea-autosize";
import CommentList from "./CommentsList";
import CommentTextbox from "./CommentTextbox";
import { createClient } from "@/utils/supabase/client";
import exp from "constants";


export default function CommentDisplay({ comment } : { comment: CommentWithProfile }) {

  const [expanded, setExpanded] = useState<boolean>(true)
  const [replying, setReplying] = useState<boolean>(false)

  const [showReplies, setShowReplies] = useState<boolean>(true)

  return (
    <div className={`flex flex-col pl-2 mb-3 ml-1 ${comment.reply_to && 'border-l-2'}`} key={`comment-${comment.id}`}>
      <div 
        className="flex items-center"
        onClick={() => { setExpanded(!expanded) }}
      >
        {/* <img className="h-8 rounded-sm" src={comment.profile.avatar_url ?? ''} /> */}
        <Link href={`/@${comment.profile.username}`} className="font-bold" onClick={(e) => {
          e.stopPropagation()
        }}>
          {comment.profile.full_name}
        </Link>
        <span 
          className={`${ButtonCSS} h-6 pt-[6px] ml-1`}
        >
          {expanded ? '[-]' : '[+]'}
        </span>
      </div>
      <div className={expanded ? '' : 'hidden'}>
        {comment.content}
      </div>

      <span className={expanded ? 'contents' : 'hidden'}>

        <div className="flex gap-2">
          {
            comment.num_replies > 0 &&
            <div
              className={LinkCSS}
              onClick={() => { setShowReplies(!showReplies) }}
            >
              {showReplies ? '[-]' : '[+]'} {comment.num_replies} replies
            </div>
          }
          <span 
            className={`${ButtonCSS} gap-0 h-6 pt-[6px] ${replying && 'bg-slate-300 dark:bg-slate-600'}`}
            onClick={() => { setReplying(!replying) }}
          >
            <IconArrowBackUp size={18} />
          </span>
        </div>
      
        { replying &&
          <CommentTextbox
            className="my-2 border-l-2 ml-0 pl-2"
            onComment={async (commentText) => {
              await createComment(createClient(), comment.post_id, comment.id, commentText)
              comment.num_replies++
              setReplying(false)
            }}
          />
        }

        <span className={showReplies && comment.num_replies > 0 ? '' : 'hidden'}>
          <CommentList postId={comment.post_id} replyToId={comment.id} key={`${comment.id}-${comment.num_replies}`} />
        </span>
      
      </span>
  </div>
  );

}