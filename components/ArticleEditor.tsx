'use client'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style'
import { EditorProvider, ReactNodeViewRenderer, useCurrentEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { KeyboardEventHandler, useState } from 'react'

import { PostWithRevision, createPost, updatePostRevision } from '@/utils/supabase/api/post'

import '../src/styles/editor.css'
import { IconBold, IconClearFormatting, IconCode, IconItalic, IconLetterP, IconStrikethrough } from '@tabler/icons-react'
import { MenuBar } from './MenuBar'
import PostTitleField from './PostTitleField'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { EditorProps } from '@tiptap/pm/view'
import CodeBlockComponent from './plugins/CodeBlockComponent'
import SaveOrPublishToolbar from './SaveOrPublishToolbar'
import { PostContentCSS } from './CSSConsts'
import TextAlign from '@tiptap/extension-text-align'
import IFramePlugin from './plugins/IFramePlugin'
import lowlight from './plugins/Lowlight'
import { toHtml } from 'hast-util-to-html'
import CollaboratorsModal from './CollaboratorsModal'
import Image from '@tiptap/extension-image'


const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    codeBlock: false
  }),
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty',
    placeholder: 'Write something great...',
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'text-blue-800 dark:text-blue-200',
    },
  }),
  Underline.configure(),
  CodeBlockLowlight
  .extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
    renderHTML({ node, HTMLAttributes }) {
      let pre = document.createElement('pre')
      let code = document.createElement('code')
      pre.appendChild(code)
      code.dataset.type = 'raw'
      console.log('node', node)
      console.log('html attributes', HTMLAttributes)
      code.innerHTML = toHtml(lowlight.highlight('js', node.textContent))
      return pre
    }
  })
  .configure({ lowlight }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  IFramePlugin,
  Image
]

export default function ArticleEditor({ post } : { post?: PostWithRevision }) {

  const client = createClient()
  const { editor } = useCurrentEditor()
  const router = useRouter()

  const [canPublish, setCanPublish] = useState<boolean>(false)
  const [canSave, setCanSave] = useState<boolean>(false)

  const [collaboratorsModalOpen, setCollaboratorsModalOpen] = useState<boolean>(false)

  let initialTitle: string | undefined = post?.title
  let currentTitle: string = initialTitle || ''

  // let initialHtml: string | undefined = post?.content
  // let currentHtml: string = initialHtml || ''

  let getHTML: Function | undefined


  const saveHandler = async ({ publish } : { publish?: boolean }) => {
    
    console.log('get html defined?')
    if(getHTML == undefined) return
    console.log('get html not undefined')
    const currentHtml = getHTML()

    console.log('current html', currentHtml)
    if(!currentTitle || !currentHtml) return
    console.log('saving post')
    let postId = post?.id

    if(!postId) {
      // todo turn this process into an RPC
      postId = await createPost(client)
    }

    console.log('post id:', postId)

    const body = { title: currentTitle, content: currentHtml, postId: postId }
    console.log('sending body', body)
    const {data, error} = await client.functions.invoke('upload_revision', {
      body: body,
    })
    if(error) {
      // todo show an error message
      console.log('error', error)
      return
    }

    console.log('received data', data)

    const revisionId = data[0]?.id

    if(revisionId && publish) {
      await updatePostRevision(client, postId, revisionId)
    }

    // const revision = await createRevision(client, postId, currentTitle, currentHtml)

    if(publish) {
      router.push(`/post/${postId}`)
      router.refresh()
    } else if(revisionId) {
      console.log('revision created')
      console.log('hello???')
      router.push(`/write/${postId}`)
    } else {
      console.log('revision failed')
    }
  }

  const changeTitle = (newTitle: string) => {
    currentTitle = newTitle
    setCanPublish(currentTitle.length > 0)
    setCanSave(currentTitle.length > 0)
  }

  const editorProps: EditorProps = {
    attributes: {
      class: PostContentCSS,
    },
    handleKeyDown: (e) => {
      if(window.scrollY + window.innerHeight + 100 > document.documentElement.scrollHeight) {
        setTimeout(() => {
          window.scrollTo(0, document.documentElement.scrollHeight)
        }, 0)
      }
    },
  }

  return (
    <>
      <PostTitleField onChange={changeTitle} initialValue={initialTitle} />
      <div className="flex-grow">
      <EditorProvider 
        injectCSS={true} slotBefore={<MenuBar supabase={client} postID={post?.id} />} extensions={extensions} content={post?.content} 
        editorProps={editorProps} onUpdate={({editor}) => {
          getHTML = editor.getHTML.bind(editor)
        }} >{' '}</EditorProvider>
      </div>
      <SaveOrPublishToolbar
        canViewRevisions={post != null}
        post={post}
        canPublish={true}
        canSave={true}
        onSave={() => saveHandler({ publish: false})}
        onPublish={() => saveHandler({ publish: true})}
      />

      {collaboratorsModalOpen && <CollaboratorsModal post={post} />}
    </>
  )
}