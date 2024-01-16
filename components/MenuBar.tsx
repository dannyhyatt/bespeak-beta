'use client'

import { useCurrentEditor } from '@tiptap/react'
import React from 'react'


import '../src/styles/editor.css'
import { IconAd, IconArrowBackUp, IconArrowForwardUp, IconBlockquote, IconBold, IconCaretDown, IconCaretDownFilled, IconClearFormatting, IconCode, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading, IconItalic, IconLetterP, IconLink, IconList, IconListNumbers, IconPlus, IconSourceCode, IconSpacingVertical, IconStrikethrough, IconUnderline, IconUnlink } from '@tabler/icons-react'

export const MenuBar = () => {
  const { editor } = useCurrentEditor()

  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  const [linkText, setLinkText] = React.useState<string | null>(null)

  if (!editor) {
    return null
  }

  console.log('active dropdown', activeDropdown)

  return (
    <>
      {/* [&>button] = buttons in toolbar
          [&>.divider] = divider
          [&>div>button] = dropdown button
          [&>div>div] = dropdown container
          [&>div>div>button] = buttons in dropdowns */}
          
      <div className={`flex flex-wrap my-4 border-2 rounded-md sticky top-20 bg-background z-10
                      [&>button]:m-1 [&>button]:p-1 [&>button.is-active]:bg-gray-300 [&>button.is-active]:dark:bg-gray-600 [&>button]:min-w-[2rem] [&>button]:rounded-md
                      [&>button:hover]:bg-gray-200 [&>button:hover]:dark:bg-gray-700 [&>button]:flex [&>*]:justify-center
                      [&>.divider]:h-6 [&>.divider]:border-l-2 [&>.divider]:my-2 [&>.divider]:mx-1
                      [&>.divider]:border-gray-300 [&>.divider]:dark:border-gray-700
                      [&>div>button]:m-1 [&>div>button]:p-1 [&>div>button]:rounded-md
                      [&>div>button]:flex [&>div>button:hover]:bg-gray-200 [&>div>button:hover]:dark:bg-gray-700 [&>div>button]:gap-2
                      [&>div>div]:z-[100000]
                      [&>div>div>button]:flex [&>div>div>button]:gap-2 [&>div>div>button]:p-1 [&>div>div>button]:m-1
                      [&>div>div>button.is-active]:bg-gray-300 [&>div>div>button.is-active]:dark:bg-gray-600
                      [&>div>div>button:hover:not(.is-active)]:bg-gray-200 [&>div>div>button:hover:not(.is-active)]:dark:bg-gray-700
                      [&>div>div>button]:rounded-md [&>div>div>button:hover]:z-auto`} id="toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold"
        >
          <IconBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <IconItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <IconUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strikethrough"
        >
          <IconStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
          title="Code"
        >
          <IconCode />
        </button>
        <button 
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear Marks"
        >
          <IconClearFormatting />
        </button>
        {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button> */}
        {/* formatting dropdown */}
        <span className="divider"></span>
        <div className='relative'>
          <button onClick={(e) => {
            if(activeDropdown == 'formatting') {
              setActiveDropdown(null)
            } else {
              setActiveDropdown('formatting')
            }
          }}
          >
            {
              editor.isActive('paragraph') ? <><IconLetterP /> Paragraph</> :
              editor.isActive('heading', { level: 1 }) ? <><IconHeading /> Heading</> :
              editor.isActive('heading', { level: 2 }) ? <><IconH2 /> Heading 2</> :
              editor.isActive('heading', { level: 3 }) ? <><IconH3 /> Heading 3</> :
              editor.isActive('heading', { level: 4 }) ? <><IconH4 /> Heading 4</> :
              editor.isActive('heading', { level: 5 }) ? <><IconH5 /> Heading 5</> :
              editor.isActive('heading', { level: 6 }) ? <><IconH6 /> Heading 6</> : 'Formatting'
            } <><IconCaretDownFilled size={16} className='self-center' /></>
          </button>

          <div className={`flex flex-col absolute bg-background border-2 rounded-md ${activeDropdown == 'formatting' ? '' : 'hidden'}`}>
            <button
              onClick={() => {
                setActiveDropdown(null)
                editor.chain().focus().setParagraph().run()
              }}
              className={editor.isActive('paragraph') ? 'is-active' : ''}
              title="Paragraph"
            >
              <IconLetterP /> Paragraph
            </button>
            <button
              onClick={() => {
                setActiveDropdown(null)
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              <IconHeading /> Heading
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
                setActiveDropdown(null)
              }}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              <IconH2 /> Heading 2
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run()
                setActiveDropdown(null)
              }}
              className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
              <IconH3 /> Heading 3
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 4 }).run()
                setActiveDropdown(null)
              }}
              className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
              <IconH4 /> Heading 4
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 5 }).run()
                setActiveDropdown(null)
              }}
              className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
              <IconH5 /> Heading 5
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 6 }).run()
                setActiveDropdown(null)
              }}
              className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
              <IconH6 /> Heading 6
            </button>
          </div>
        </div>
        <span className="divider"></span>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <IconList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <IconListNumbers />
        </button>
        <span className="divider"></span>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <IconSourceCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title='Blockquote'
        >
          <IconBlockquote />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title='Horizontal Rule'        
        >
          <IconSpacingVertical />
        </button>
        {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button> */}
        <span className="divider"></span>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
          className={!editor.can()
            .chain()
            .focus()
            .undo()
            .run() ? 'opacity-50' : ''}
          title='Undo'
        >
          <IconArrowBackUp />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
          className={!editor.can()
            .chain()
            .focus()
            .redo()
            .run() ? 'opacity-50' : ''}
          title='Redo'
        >
          <IconArrowForwardUp />
        </button>
        {/* <span className="divider"></span>
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
        >
          purple
        </button> */}
        <span className="divider"></span>
        <div className='relative'>
          <button
            onClick={() => {
              if(activeDropdown == 'link') {
                setActiveDropdown(null)
              } else {
                setActiveDropdown('link')
                setLinkText(editor.getAttributes('link').href)
              }
            }}
            title='Set Link'
          >
            <IconLink /> <IconCaretDownFilled size={16} className='self-center' />
          </button>
          <div className={`flex absolute bg-background border-2 rounded-md ${activeDropdown == 'link' ? '' : 'hidden'}`}>
            <input type='text' placeholder='https://website.com' className='p-1 m-1 rounded-md bg-background' 
              onChange={(e) => {
                setLinkText(e.target.value)
              }}
              value={linkText ?? editor.getAttributes('link').href ?? ''} 
            />
            <button
              onClick={() => {
                setActiveDropdown(null)
                if(editor.getAttributes('link').href == linkText || !linkText)
                  editor.chain().focus().unsetLink().run()
                else
                  editor.chain().focus().setLink({ href: linkText }).run()
              }}
              title='Unset Link'
            >
              {editor.getAttributes('link').href != linkText ? <IconLink /> : <IconUnlink /> }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
