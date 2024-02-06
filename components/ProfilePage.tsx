'use client'

import Profile from "@/utils/supabase/api/profile"
import ProfileDisplay from "./ProfileDisplay"
import { SupabaseClient } from "@supabase/supabase-js"
import { PostWithRevision } from "@/utils/supabase/api/post"
import PostList from "./PostList"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { IconCirclePlus } from "@tabler/icons-react"
import NewListModal from "./NewListModal"
import Readlist from "@/utils/supabase/api/readlists"
import { read } from "fs"
import Link from "next/link"

export default function ProfilePage({ viewingProfile, posts, initialReadlists, profile } : { viewingProfile: Profile, posts: PostWithRevision[], initialReadlists: Readlist[], profile: Profile | undefined }) {

  const [showing, setShowing] = useState<'posts' | 'lists'>('posts')

  const [newListModalOpen, setNewListModalOpen] = useState(false)

  const [readlists, setReadlists] = useState<Readlist[]>(initialReadlists)

  const isCurrentProfile = profile?.id == viewingProfile.id

  console.log('got lists', readlists)
  
  return (
    <>
      <ProfileDisplay profile={viewingProfile} supabase={createClient()} isCurrentProfile={isCurrentProfile} />
      
      <div className='flex flex-row items-start gap-2'>
        <h1
          onClick={() => setShowing('posts')}
          className={`text-xl font-bold mt-8 mb-4 cursor-pointer ${showing == 'posts' && 'rounded-underline'}`}>
            Posts
        </h1>
        <h1 
          onClick={() => setShowing('lists')}
          className={`text-xl font-bold mt-8 mb-4 cursor-pointer ${showing == 'lists' && 'rounded-underline'}`}>
            Lists
        </h1>
      </div>
      { showing == 'posts' && 
        (posts.length != 0 ? <PostList initialPosts={posts}  /> : <div className="text-2xl text-center">No posts yet</div>)
      }
      { showing == 'lists' && 
        <>
          { isCurrentProfile && 
            <div 
              onClick={() => setNewListModalOpen(true)}
              className="text-lg px-4 py-2 flex items-center gap-2 border-2 rounded-md cursor-pointer sm:mx-[-1rem]">
              <IconCirclePlus /> New List
            </div>
          }

          {
            readlists.length != 0 ?

            readlists.map((list) => (
              <Link href={`/list/${list.id}`} className="p-4 border-2 rounded-md mt-4 text-lg sm:mx-[-1rem]" key={list.id}>
                {list.name} <span className="text-sm">({list.num_items} item{list.num_items != 1 && 's'})</span>
              </Link>
            )) : 

            <div className="text-2xl text-center mt-4 sm:mx-[-1rem]">
              No lists yet
            </div>
          }
        </>
      }

      { newListModalOpen && 
        <NewListModal
          onListCreated={(newReadlist) => {
            setNewListModalOpen(false)
            setReadlists([newReadlist, ...readlists])
          }} 
          onCancel={() => setNewListModalOpen(false)}
        />
      }
    </>
  )
}