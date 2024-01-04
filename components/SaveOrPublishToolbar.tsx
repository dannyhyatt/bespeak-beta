import { useState } from "react"
import FixedBottomToolbar from "./FixedBottomToolbar"
import Link from "next/link"

export default function SaveOrPublishToolbar({
  canPublish, canSave, onPublish, onSave
}: {
  canPublish: boolean
  canSave: boolean
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

  return (
    <FixedBottomToolbar>
      <Link href="/write" className="text-sm font-semibold text-gray-500 mr-auto ml-2">
        View Revisions
      </Link>
      <button onClick={saveHandler} className={`bg-gray-500 text-white text-sm font-semibold px-3 py-2 rounded-md mr-2 ${canSave ? '' : 'opacity-30 cursor-not-allowed'}`} disabled={!canSave}>
        {saveText}
      </button>
      <button onClick={onPublish} className={`bg-black text-white text-sm font-semibold px-3 py-2 rounded-md ${canPublish ? '' : 'opacity-30 cursor-not-allowed'}`} disabled={!canPublish}>
        {publishText}
      </button>
    </FixedBottomToolbar>
  )
}