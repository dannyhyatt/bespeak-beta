'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { KeyboardEventHandler, useState } from 'react'

import { PostWithRevision } from '@/utils/supabase/api/post'

import '../src/styles/editor.css'
import { IconBold, IconClearFormatting, IconCode, IconItalic, IconLetterP, IconStrikethrough } from '@tabler/icons-react'
import { MenuBar } from './MenuBar'
import PostTitleField from './PostTitleField'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

export default function ArticleEditor({ post } : { post?: PostWithRevision }) {

  const client = createClient()

  const router = useRouter()

  const [canPublish, setCanPublish] = useState<boolean>(false)
  const [canSave, setCanSave] = useState<boolean>(false)

  let initialTitle: string | undefined = post?.title
  let currentTitle: string = initialTitle || ''

  let initalHtml: string | undefined = post?.content
  let currentHtml: string | undefined = initalHtml

  const changeTitle = (newTitle: string) => {
    currentTitle = newTitle
    setCanPublish(currentTitle.length > 0)
    setCanSave(currentTitle.length > 0)
  }

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if(window.scrollY + window.innerHeight + 100 > document.documentElement.scrollHeight) {
      window.scrollTo(0, document.documentElement.scrollHeight)
    }
  }

  return (
    <>
      <PostTitleField onChange={changeTitle} initialValue={initialTitle} />
      <EditorProvider injectCSS={true} slotBefore={<MenuBar />} extensions={extensions} content={post?.content}>{' '}</EditorProvider>
    </>
  )
}