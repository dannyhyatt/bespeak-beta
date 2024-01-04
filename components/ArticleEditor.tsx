'use client'

import {Post, PostWithRevision, createPost, createRevision, updatePostRevision } from "@/utils/supabase/api/post";
import Editor from "./LexicalEditor";
import PostTitleField from "./PostTitleField";
import SaveOrPublishToolbar from "./SaveOrPublishToolbar";
import { KeyboardEventHandler, MutableRefObject, useEffect, useRef, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot, EditorState, LexicalEditor } from "lexical";
import { createClient } from "@/utils/supabase/client";
import { title } from "process";
import { useRouter } from "next/navigation";

export default function ArticleEditor({ post }: { post?: PostWithRevision }) {

  const client = createClient()

  const router = useRouter()

  const [canPublish, setCanPublish] = useState<boolean>(false)
  const [canSave, setCanSave] = useState<boolean>(false)

  console.log('post', post)

  let initialTitle: string | undefined = post?.title
  let currentTitle: string = initialTitle || ''

  let initalHtml: string | undefined = post?.content
  let currentHtml: string | undefined = initalHtml

  const editorStateRef = useRef<EditorState>()


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

  const saveHandler = async () => {
    console.log('save handler', currentHtml)
    if(!currentTitle || !currentHtml) return
    console.log('saving post')
    let postId = post?.id
    if(!postId) {
      // todo turn this process into an RPC
      postId = await createPost(client)
    }

    const revision = await createRevision(client, postId, currentTitle, currentHtml)

    if(revision) {
      console.log('revision created')
      await updatePostRevision(client, postId, revision.id)
      console.log('hello???')
      router.push(`/write/${postId}`)

    } else {
      console.log('revision failed')
    }
    
  }

  useEffect(() => { 
    window.onbeforeunload = function() {
      // todo check if there are any unsaved changes
      return 'Are you sure you want to leave?'
    }
  }, [])

  return (
    <>
      <PostTitleField onChange={changeTitle} initialValue={initialTitle} />
      <div id="editor-wrapper" className="mb-4" onKeyDown={keyDownHandler}>
        {/* this is inefficient, as the html is parsed for every change
            in the future this should be fixed by only generating the html
            when the save or publish button is pressed */}
        <Editor editorStateRef={editorStateRef} initalHtml={post?.content} onHtmlChanged={(e) => {
          currentHtml = e
        }} />
      </div>
      <span id="save-or-publish-toolbar">
        <SaveOrPublishToolbar
          canPublish={true}
          canSave={true}
          onPublish={async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            // Your publish logic here
          }}
          onSave={saveHandler}
        />
      </span>
    </>
  );
}