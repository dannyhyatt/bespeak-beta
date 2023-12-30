import FixedBottomToolbar from "./FixedBottomToolbar"


export default function SaveOrPublishToolbar({
  canPublish, canSave, onPublish, onSave
}: {
  canPublish: boolean,
  canSave: boolean,
  onPublish: () => void,
  onSave: () => void
}) {

  return (
    <FixedBottomToolbar className="justify-end">
      <button onClick={onSave} className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mr-2 ${canSave ? '' : 'opacity-30 cursor-not-allowed'}`} disabled={!canSave}>
        Save
      </button>
      <button onClick={onPublish} className={`bg-green-500 text-white font-semibold px-4 py-2 rounded-md ${canPublish ? '' : 'opacity-30 cursor-not-allowed'}`} disabled={!canPublish}>
        Publish
      </button>
    </FixedBottomToolbar>
  )
}