import { Revision, RevisionCardInfo } from "@/utils/supabase/api/post";
import { format, parseISO } from "date-fns";
import Link from "next/link";

// todo make it auto-scroll to the current revision
export default function RevisionsEditorBar({ revisions, currentRevisionId, currentPostId } : { revisions: RevisionCardInfo[], currentRevisionId: string, currentPostId: string }) {
  return (
    <div className="flex flex-row items-center justify-between overflow-x-scroll mb-8">
      {revisions.map(revision => {
        return (
          <Link href={`/write/${currentPostId}/${revision.id}`} className={`flex flex-col items-center justify-center px-4 py-2 rounded-md cursor-pointer ${revision.id === currentRevisionId ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
            <div className="text-sm">{revision.title}</div>
            <div className="text-xs text-gray-500 whitespace-nowrap">{format(parseISO(revision.created_at), "LLLL d, yyyy 'at' h:mm a")}</div>
          </Link>
        )
      })}
    </div>
  )
}