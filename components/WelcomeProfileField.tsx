'use client'

import Profile from '@/utils/supabase/api/profile'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'

export default function WelcomeProfileField({
  displayFieldName, className, disabled, placeholder, onChange, isValid, value, useTextArea, maxLines
}: {
  displayFieldName: string,
  className?: string
  disabled?: boolean
  placeholder?: string
  onChange: (value: string) => void
  isValid: boolean
  value: string
  useTextArea?: boolean
  maxLines?: number
}) {

  return (
    <span className={`${className} flex items-center font-bold bg-transparent cursor-text outline-none overflow-visible`}>
      {useTextArea ?
        <ReactTextareaAutosize onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)} disabled={disabled}
        className={`bg-transparent cursor-text outline-none overflow-visible w-[calc(100%_-_calc(40px_+_1.5rem))] resize-none`}
        spellCheck={false} maxRows={maxLines ?? 3} minRows={1} maxLength={2000}
        placeholder={placeholder ?? `No ${displayFieldName.toLowerCase()} (yet!)`}  value={value} />  
          :
        <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)} disabled={disabled}
        className={`bg-transparent cursor-text outline-none overflow-visible w-[calc(100%_-_calc(40px_+_1.5rem))]`}
        spellCheck={false}
        placeholder={placeholder ?? `No ${displayFieldName.toLowerCase()} (yet!)`}  value={value} />  
      }
      <button disabled className={`ml-auto font-bold bg-transparent outline-none inline align-bottom h-8 ${isValid ? 'visible' : 'invisible'}`}>
        <svg className="text-green-500 transition-colors duration-200 w-6 h-6 mx-2"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </button>
    </span>
)
}