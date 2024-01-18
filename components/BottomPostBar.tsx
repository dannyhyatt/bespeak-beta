import { BookmarkIcon, ChevronDownIcon, CommentIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from "./Icons";


export default function BottomPostBar() {
  return (
    <div className={`flex sticky bottom-0 border-b-0  mt-8 mx-[-0.75rem] border-x-0 border-2 border-r-0 bg-background text-foreground 
                    sm:mx-[-1rem] sm:px-2 sm:rounded-lg sm:border-b-0 sm:rounded-b-none sm:border-x-2
                    pb-[max(calc(env(safe-area-inset-bottom)-12px),0px)]`}>

      <span className="flex">
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><BookmarkIcon /></span>
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><ShareIcon /></span>
      </span>
      <span className="flex ml-auto">
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer">Comments <ChevronDownIcon className="inline" /></span>
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><ThumbsUpIcon /></span>
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><ThumbsDownIcon /></span>
      </span>
    </div>
  )
}