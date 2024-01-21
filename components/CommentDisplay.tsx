import { CommentWithProfile } from "@/utils/supabase/api/comment";
import { ButtonCSS } from "./CSSConsts";
import { useState } from "react";
import Link from "next/link";


export default function CommentDisplay({ comment } : { comment: CommentWithProfile }) {

  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <div className="flex flex-col pl-2 mb-3 mt-1 ml-1" key={`comment-${comment.id}`}>
      <div className="flex items-center">
        {/* <img className="h-8 rounded-sm" src={comment.profile.avatar_url ?? ''} /> */}
        <Link href={`/@${comment.profile.username}`} className="font-bold">
          {comment.profile.full_name}
        </Link>
        <span 
          className={`${ButtonCSS} h-6 aspect-square pt-[6px] ml-1`}
          onClick={() => { setExpanded(!expanded) }}
        >
          {expanded ? '[-]' : '[+]'}
        </span>
      </div>
      <div className={expanded ? '' : 'hidden'}>
        {comment.content}
      </div>
  </div>
  );

}