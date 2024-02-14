'use client'

import { PostWithRevision } from "@/utils/supabase/api/post"
import Profile from "@/utils/supabase/api/profile"
import Link from "next/link"
import { useState } from "react"
import { PostCard } from "./PostCard"
import ProfileCard from "./ProfileCard"
import { ReadlistWithProfile } from "@/utils/supabase/api/readlists"

export default function SearchPage({ query, initialPosts, initialProfiles, initialLists } : { query: string, initialPosts: PostWithRevision[], initialProfiles: Profile[], initialLists: ReadlistWithProfile[]}) {

  const [showing, setShowing] = useState<'posts' | 'people' | 'lists'>('posts')

  const [posts, setPosts] = useState<PostWithRevision[]>(initialPosts)
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [lists, setLists] = useState<ReadlistWithProfile[]>(initialLists)

  return (
    <>
      <h1>Search results for "{query}"</h1>
      <div className='flex flex-row items-start gap-2'>
        <h1
          onClick={() => setShowing('posts')}
          className={`text-xl font-bold mt-8 mb-4 cursor-pointer ${showing == 'posts' && 'rounded-underline'}`}>
            Posts
        </h1>
        <h1 
          onClick={() => setShowing('people')}
          className={`text-xl font-bold mt-8 mb-4 cursor-pointer ${showing == 'people' && 'rounded-underline'}`}>
            People
        </h1>
        <h1 
          onClick={() => setShowing('lists')}
          className={`text-xl font-bold mt-8 mb-4 cursor-pointer ${showing == 'lists' && 'rounded-underline'}`}>
            Lists
        </h1>
      </div>

      <div className={showing == 'posts' ? 'contents' : 'hidden'}>
      {
        posts.length != 0 ? posts.map(post => (
          <PostCard post={post} key={post.id} />
        )) : <div className="text-2xl text-center mt-8">No posts found</div>
      }
      </div>

      <div className={showing == 'people' ? 'contents' : 'hidden'}>
      {
        profiles.length != 0 ? profiles.map(profile => (
          <ProfileCard profile={profile} key={profile.id} />
        )) : <div className="text-2xl text-center mt-8">No profiles found</div>
      }
      </div>

      <div className={showing == 'lists' ? 'contents' : 'hidden'}>
      {
        lists.length != 0 ? lists.map(list => (
          <Link href={`/list/${list.id}`} key={list.id} className="mb-4 rounded-md shadow-lg dark:border-grey-50 border-2 p-4 sm:mx-[-1rem]">
            <h1 className="text-xl font-bold">{list.name} <span className="text-base font-normal">by @{list.username}</span></h1>
          </Link>
        )) : <div className="text-2xl text-center mt-8">No lists found</div>
      }
      </div>

    </>
  )
}