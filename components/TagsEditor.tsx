import { IconX } from "@tabler/icons-react"
import { set } from "date-fns"
import { useRef, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"

export default function TagsEditor({ initialTags, onTagsChanged } : { initialTags: string[], onTagsChanged: (tags: string[]) => void}) {

  const [tags, setTags] = useState<string[]>(initialTags)

  const span = useRef<HTMLSpanElement>(null)

  const [newTag, setNewTag] = useState<string>('')

  const [saveText, setSaveText] = useState<string>('Save')
  const [canSave, setCanSave] = useState<boolean>(false)

  let inputWith: number | undefined = undefined

  const addTag = () => {
    if (newTag.length === 0) return
    if (tags.includes(newTag)) return
    setTags([...tags, newTag])
    setNewTag('')
    onTagsChanged([...tags, newTag])
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
    onTagsChanged(tags.filter(t => t !== tag))
  }

  console.log('span', span.current?.clientWidth)

  return (
    <>
      <h4 className="text-xl mt-6 mb-2 sm:mx-[-3.5rem] font-bold">Tags</h4>
      <div className="flex flex-wrap border-2 rounded-lg p-2 mx-[-0.5rem] sm:mx-[-4rem] gap-y-2">
          {tags.map(tag => (
            <div key={tag} className="flex bg-gray-200 dark:bg-gray-700 mr-2 py-1 px-2 rounded-md">
              <span className="w-max">{tag}</span>
              <button onClick={() => removeTag(tag)}>
                <IconX size={14} className="ml-2 m-1" />
              </button>
            </div>
          ))}

          <span ref={span} className="absolute text-lg invisible -z-50">{newTag ? newTag : "Add a tag..."}</span>
          <input 
            placeholder="Add a tag..."
            style={{ width: span.current && newTag ? span.current.clientWidth + 18 : '' }}
            className={`bg-background h-6 resize-none self-center focus-visible:outline-none`}
            type='text' value={newTag}
            onChange={e => setNewTag(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
            onKeyUp={e => { if(e.key == 'Enter') addTag() }}
          />
      </div>
    </>
  )

}