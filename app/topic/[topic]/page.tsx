import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getAvatarUrl, getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getPostDataForPageById, getPostsByTag, getReaction } from '@/utils/supabase/api/post'
import Link from 'next/link'
import BottomPostBar from '@/components/BottomPostBar'
import { LinkCSS, PostContentCSS, PostTitleCSS } from '@/components/CSSConsts'

import { format, parseISO } from 'date-fns'
import { PostCard } from '@/components/PostCard'

export default async function Index({
  params
} : { params: { topic: string } }) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const posts = await getPostsByTag(supabase, params.topic)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='lg:w-7/12'>

      <h1 className='text-4xl font-bold border-b mb-8'>{params.topic} Posts</h1>
      {
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      }

    </StandardResponsivePage>
  )
}