'use client'

import { PostWithRevision } from "@/utils/supabase/api/post";
import { BookmarkIcon, ChevronDownIcon, CommentIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from "./Icons";
import { IconCopy, IconCopyCheck, IconDotsVertical, IconLayoutNavbarExpand } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import CommentList from "./CommentsList";


export default function BottomPostBar({ post } : { post: PostWithRevision}) {

  const [expanded, setExpanded] = useState<boolean>(false)
  const [canShare, setCanShare] = useState<boolean>(false)
  const [showCopied, setShowCopied] = useState<boolean>(false)

  const [showComments, setShowComments] = useState<boolean>(false)

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        text: `Check out this article on Bespeak!`,
        url: `${window.location.href}`
      })
    } else {
      navigator.clipboard.writeText(`${window.location.href}`)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    }
    // todo copy link to clipboard if no share
  }

  useEffect(() => {
    setCanShare(!!navigator.share)
  }, [])

  return (
    // todo make the height transition work when the comments are shown
    <div className={`flex flex-col transition-all sticky bottom-[-0.25rem] ${showComments ? 'bottom-4' : 'sm:rounded-b-none'}  mt-8 mx-[-0.75rem] border-x-0 border-2 border-r-0 bg-background text-foreground 
                    sm:mx-[-1rem] sm:px-2 sm:rounded-lg sm:border-x-2
                    pb-[max(calc(env(safe-area-inset-bottom)-8px),0px)]`}>

      <span className="flex place-content-between">

        <span className={`flex flex-col`}>
          <span className={`flex ${/*!expanded && 'sm:hidden'*/ ''}`}>
            <span
              className="p-2 m-1 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md cursor-pointer"
            >
              <BookmarkIcon />
            </span>
            <span 
              onClick={shareArticle}
              className="p-2 m-1 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md cursor-pointer">
                {canShare ? <ShareIcon /> : 
                  showCopied ? <IconCopyCheck /> : <IconCopy />}
            </span>
          </span>
          <span className="hidden">
            <span 
              className="p-2 m-1 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              <IconDotsVertical className="rotate-90" />
            </span>
          </span>
        </span>

        <span>
          <span className="flex">
            <span 
              className="p-2 m-1 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md cursor-pointer"
              onClick={() => setShowComments(!showComments)}
            >
              Comments <ChevronDownIcon className="inline" />
            </span>
            <span className="p-2 m-1 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md cursor-pointer"><ThumbsUpIcon /></span>
            <span className="p-2 m-1 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md cursor-pointer"><ThumbsDownIcon /></span>
          </span>
        </span>

      </span>

      {
        <span className={`${!showComments && 'h-0 transition-all'} h-[40vh] overflow-hidden`}>
          <CommentList replyToId={null} postId={post.id} />
        </span>
      }
    </div>
  )
}