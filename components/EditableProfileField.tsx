'use client'

import Profile from '@/utils/supabase/api/profile'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function EditableProfileField({
  profile, dbField, displayFieldName, initialValue, className
}: {
  profile: Profile,
  dbField: string,
  displayFieldName: string,
  initialValue: string | undefined,
  className?: string
}) {

  const [value, setValue] = useState<string>(initialValue || '')
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false)

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if(e.target.value !== initialValue) {
      setShowSaveButton(true)
    } else {
      setShowSaveButton(false)
    }
  }

  const saveField = async () => {
    // check to make sure the value is different
    if(value === initialValue) return

    const { data, error } = await createClient()
      .from('profiles')
      .update({ [dbField]: value })
      .eq('id', profile?.id)
      .single()
    
    if (error) {
      console.error(error)
    } else {
      initialValue = value
      showSaveButton && setShowSaveButton(false)
    }
  }

  return (
    <span onBlur={saveField} className={`${className} flex items-center font-bold bg-transparent cursor-text outline-none overflow-visible`}>
      <input onChange={handleTyping}
        className={`bg-transparent cursor-text outline-none overflow-visible`} 
        placeholder={`No ${displayFieldName.toLowerCase()} (yet!)`}  value={value} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            saveField()
          }
        }}/>
      <button onClick={saveField} className={`ml-auto font-bold bg-transparent outline-none inline align-bottom h-8 cursor-pointer ${showSaveButton ? 'visible' : 'invisible'}`}>
        <svg className="text-gray-500 hover:text-gray-900 transition-colors duration-200 w-6 h-6 mx-2 hover:stroke-2 "
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </button>
    </span>
)
}