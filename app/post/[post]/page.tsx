import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getPostDataForPageById } from '@/utils/supabase/api/post'
import Link from 'next/link'

export default async function Index({
  params
} : { params: { post: string } }) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
  
  const post = await getPostDataForPageById(supabase, params.post)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      <h1 className={`bg-transparent cursor-text outline-none overflow-visible text-2xl mb-1 font-semibold resize-none`}>
        {post?.title}
      </h1>
      <Link className="text-lg mb-3" href={`/profile/${post.author_id}`}>
        <span className="align-middle">by </span> 
        <img className="inline h-8 rounded-sm align-middle" src={post.avatar_url} />
        <span className="align-middle">{post.avatar_url ? ' ' : ''}{post.author_name}</span>
      </Link>
      {post?.content && <div dangerouslySetInnerHTML={{ __html: post.content }}></div>}
    </StandardResponsivePage>
  )
}