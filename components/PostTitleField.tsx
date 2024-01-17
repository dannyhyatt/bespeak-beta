'use client'

import {Post} from '@/utils/supabase/api/post'
import Profile from '@/utils/supabase/api/profile'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { PostTitleCSS } from './CSSConsts'

export default function PostTitleField({
  onChange, initialValue, post, className, autofocus
}: {
  onChange: (arg0: string) => void,
  initialValue?: string,
  post?: Post,
  className?: string
  autofocus?: boolean
}) {

  const [value, setValue] = useState<string>(initialValue || '')

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <ReactTextareaAutosize onChange={handleTyping} autoFocus={autofocus || false}
      onKeyDown={(e) => {
        if(e.key === 'Enter') {
          e.preventDefault()
          e.stopPropagation()
          onChange(value)
        }
      }}
      className={PostTitleCSS + ' ' + className} 
      spellCheck={false} 
      placeholder={`Your title...`}  value={value} onKeyUp={(e) => onChange(e.currentTarget.value)}/>
  )
}