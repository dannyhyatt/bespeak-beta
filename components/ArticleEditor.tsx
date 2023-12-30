'use client'

import Post from "@/utils/supabase/api/post";
import Editor from "./LexicalEditor";
import PostTitleField from "./PostTitleField";
import SaveOrPublishToolbar from "./SaveOrPublishToolbar";
import { MutableRefObject, useRef, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { EditorState, LexicalEditor } from "lexical";

export default function ArticleEditor({ post }: { post?: Post}) {

  const [canPublish, setCanPublish] = useState<boolean>(false)
  const [canSave, setCanSave] = useState<boolean>(false)

  let title: string = ''

  let initalHtml: string | undefined = undefined
  let currentHtml: string | undefined = undefined

  const editorStateRef = useRef<EditorState>()


  const changeTitle = (newTitle: string) => {
    title = newTitle
    setCanPublish(title.length > 0)
    setCanSave(title.length > 0)
  }

  return (
    <>
      <PostTitleField onChange={changeTitle} />
      <Editor editorStateRef={editorStateRef} />
      <SaveOrPublishToolbar canPublish={canPublish} canSave={canSave} onPublish={() => {}} onSave={() => {}} />
    </>
  );
}