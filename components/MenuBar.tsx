'use client'

import { useCurrentEditor } from '@tiptap/react'
import React from 'react'


import '../src/styles/editor.css'
import { IconAd, IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight, IconArrowBackUp, IconArrowForwardUp, IconBlockquote, IconBold, IconCaretDown, IconCaretDownFilled, IconClearFormatting, IconCode, IconFrame, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading, IconItalic, IconLetterP, IconLink, IconList, IconListNumbers, IconPhoto, IconPlus, IconSourceCode, IconSpacingVertical, IconSquarePlus, IconStrikethrough, IconTextCaption, IconUnderline, IconUnlink } from '@tabler/icons-react'
import { createClient } from '@/utils/supabase/client'
import { SupabaseClient } from '@supabase/supabase-js'
import { Post } from '@/utils/supabase/api/post'

export const MenuBar = ( {supabase, postID} : { supabase: SupabaseClient, postID: string | undefined } ) => {
  const { editor } = useCurrentEditor()

  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const FormattingDropdown = 'formatting'
  const AlignmentDropdown = 'alignment'

  const [linkText, setLinkText] = React.useState<string | null>(null)

  if (!editor) {
    return null
  }

  return (
    <>
      {/* [&>button] = buttons in toolbar
          [&>.divider] = divider
          [&>div>button] = dropdown button
          [&>div>div] = dropdown container
          [&>div>div>button] = buttons in dropdowns */}
          
      <div className={`flex flex-wrap my-4 border-2 rounded-md sticky top-20 bg-background z-10 mx-[-0.5rem] sm:mx-[-4rem]
                      [&>button]:m-1 [&>button]:p-1 [&>button.is-active]:bg-gray-300 [&>button.is-active]:dark:bg-gray-600 [&>button]:min-w-[2rem] [&>button]:rounded-md
                      [&>button:hover]:bg-gray-200 [&>button:hover]:dark:bg-gray-700 [&>button]:flex [&>*]:justify-center
                      [&>button]:disabled:opacity-70
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
            if(activeDropdown == AlignmentDropdown) {
              setActiveDropdown(null)
            } else {
              setActiveDropdown(AlignmentDropdown)
            }
          }}
          >
            {
              editor.isActive({ textAlign: 'left' }) ? <IconAlignLeft /> :
              editor.isActive({ textAlign: 'center' }) ? <IconAlignCenter /> :
              editor.isActive({ textAlign: 'right' }) ? <IconAlignRight /> :
              editor.isActive({ textAlign: 'justify' }) ? <IconAlignJustified /> : 'Alignment'
            } <><IconCaretDownFilled size={16} className='self-center' /></>
          </button>

          <div className={`flex flex-col absolute bg-background border-2 rounded-md ${activeDropdown == AlignmentDropdown ? '' : 'hidden'}`}>
            <button
              onClick={() => {
                setActiveDropdown(null)
                editor.chain().focus().setTextAlign('left').run()
              }}
              className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
              title="Left Align"
            >
              <IconAlignLeft />
            </button>
            <button
              onClick={() => {
                setActiveDropdown(null)
                editor.chain().focus().setTextAlign('center').run()
              }}
              className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
              title="Center Align"
            >
              <IconAlignCenter />
            </button>
            <button
              onClick={() => {
                setActiveDropdown(null)
                editor.chain().focus().setTextAlign('right').run()
              }}
              className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
              title="Right Align"
            >
              <IconAlignRight />
            </button>
            <button
              onClick={() => {
                setActiveDropdown(null)
                editor.chain().focus().setTextAlign('justify').run()
              }}
              className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
              title="Justify"
            >
              <IconAlignJustified />
            </button>
          </div>
        </div>
        <span className="divider"></span>
        <div className='relative'>
          <button onClick={(e) => {
            if(activeDropdown == FormattingDropdown) {
              setActiveDropdown(null)
            } else {
              setActiveDropdown(FormattingDropdown)
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

          <div className={`flex flex-col absolute bg-background border-2 rounded-md ${activeDropdown == FormattingDropdown ? '' : 'hidden'}`}>
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

        <span className="divider"></span>

        
        <input id="image-upload" type="file" className='hidden' accept=".png,.jpeg,.heic" onChange={async (e) => {
            const input = e.target;
            if (input.files && input.files[0]) {

              console.log(`${postID}/${Date.now()}`);

              const { data, error } = await supabase
                .storage
                .from('article_images')
                .upload(`${postID}/${Date.now()}`, input.files[0], {
                  cacheControl: '3600',
                  upsert: true,
                })
              
              if(error) {
                console.error(error)
                alert('Error uploading image')
                return
              }

              const url = supabase.storage.from('article_images').getPublicUrl(data.path).data.publicUrl;
              
              editor.chain().focus().setImage({ src: url }).run()

              // var reader = new FileReader();
          
              // reader.onload = function (e) {
              //   if(e.target && e.target.result) {
              //     editor.chain().focus().setImage({ src: e.target.result as string }).run()
              //   }
              // };
          
              // reader.readAsDataURL(input.files[0]);
            }
        }} />
        <button
          onClick={(e) => {
            // console.log(e.target)
            // document.getElementById('image-upload')?.click()
          }}
          title='Insert Image'
        >
          <label htmlFor="image-upload" id="image-upload-label" className='contents cursor-pointer h-0 w-0 overflow-visible' onClick={(e) => {
            if(!postID) {
              alert('Save your artticle before uploading images')
              e.preventDefault()
              e.stopPropagation()
            }
          }}>
            <IconPhoto />
          </label>
        </button>

        <button
          onClick={() => {
            if(editor.can().imageToFigure())
              editor.chain().focus().imageToFigure().run()
            else
              editor.chain().focus().figureToImage().run()
          }}
          title='Add Caption'
        >
          <IconTextCaption />
        </button>
        
        <span className="divider"></span>

        <button
          onClick={() => editor.chain().focus().setIframe({ src: window.prompt('What URL?') ?? 'youtube.com' }).run()}
          title='Insert Frame'
        >
          <IconSquarePlus />
        </button>

      </div>
    </>
  )
}
