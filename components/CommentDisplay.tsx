import { CommentWithProfile } from "@/utils/supabase/api/comment";
import { ButtonCSS } from "./CSSConsts";
import { useState } from "react";
import Link from "next/link";
import { IconArrowBackUp, IconMessageReply } from "@tabler/icons-react";


export default function CommentDisplay({ comment } : { comment: CommentWithProfile }) {

  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <div className="flex flex-col pl-2 mb-3 ml-1" key={`comment-${comment.id}`}>
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

      {expanded && <div className="flex gap-2 ml-[-0.5rem]">

        <span 
          className={`${ButtonCSS} gap-0 h-6 pt-[6px]`}
        >
          <IconArrowBackUp size={18} />
        </span>

      </div>}
  </div>
  );

}