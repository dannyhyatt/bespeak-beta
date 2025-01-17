import { useState } from "react"
import FixedBottomToolbar from "./FixedBottomToolbar"
import Link from "next/link"
import { PostWithRevision } from "@/utils/supabase/api/post"
import { IconHistory } from "@tabler/icons-react"
import { ButtonCSS } from "./CSSConsts"

export default function SaveOrPublishToolbar({
  canPublish, canSave, canViewRevisions, post, onPublish, onSave
}: {
  canPublish: boolean
  canSave: boolean
  canViewRevisions: boolean
  post?: PostWithRevision
  onPublish: () => Promise<void>
  onSave: () => Promise<void>
}) {

  const [saveText, setSaveText] = useState<string>('Save')
  const [publishText, setPublishText] = useState<string>('Publish')

  const saveHandler = async () => {
    setSaveText('Saving...')
    await onSave()
    setSaveText('Save')
  }

  const publishHandler = async () => {
    setPublishText('Publishing...')
    await onPublish()
    setPublishText('Publish')
  }

  return (
    <FixedBottomToolbar className="my-4 mx-[-0.5rem] sm:mx-[-4rem]">
      {canViewRevisions ? 
        <>
          <Link href={`/write/${post?.id}/${post?.revision_id}`} className="text-sm font-semibold text-gray-500 dark:text-gray-100 ml-2 mr-auto">
            <span className={ButtonCSS}>
              <IconHistory /> Revisions
            </span>
          </Link>
          {/* <span 
            className="text-sm font-semibold text-gray-500 dark:text-gray-100 mr-auto ml-2">
            <span className={ButtonCSS}>
              <IconHistory /> Revisions
            </span>
          </span> */}
        </>
        : <div className="mr-auto"></div>}
      <button onClick={saveHandler} className={`bg-gray-500 text-white text-sm font-semibold px-3 py-2 rounded-md mr-2 ${canSave ? '' : 'opacity-30 cursor-not-allowed'}`} disabled={!canSave}>
        {saveText}
      </button>
      <button onClick={publishHandler} className={`bg-gray-700 text-white text-sm font-semibold px-3 py-2 rounded-md ${canPublish ? '' : 'opacity-30 cursor-not-allowed'}`} disabled={!canPublish}>
        {publishText}
      </button>
    </FixedBottomToolbar>
  )
}