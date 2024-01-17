import { BookmarkIcon, ChevronDownIcon, CommentIcon, ShareIcon, ThumbsDownIcon, ThumbsUpIcon } from "./Icons";


export default function BottomPostBar() {
  return (
    <div className="flex sticky bottom-0 border-2 border-b-0 rounded-lg rounded-b-none mt-8 bg-background text-foreground sm:mx-[-1rem] sm:px-2 pb-[max(calc(env(safe-area-inset-bottom)-12px),0px)]">
      <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><BookmarkIcon /></span>
      <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><ShareIcon /></span>
      <span className="flex ml-auto">
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer">Comments <ChevronDownIcon className="inline" /></span>
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><ThumbsUpIcon /></span>
        <span className="p-2 m-1 hover:bg-gray-200 rounded-md cursor-pointer"><ThumbsDownIcon /></span>
      </span>
    </div>
  )
}