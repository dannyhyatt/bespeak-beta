import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getPostDataForPageById } from '@/utils/supabase/api/post'
import Link from 'next/link'
import BottomPostBar from '@/components/BottomPostBar'
import { LinkCSS, PostContentCSS, PostTitleCSS } from '@/components/CSSConsts'

import '../../../src/styles/editor.css'

export default async function Index({
  params
} : { params: { post: string } }) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
  
  const post = await getPostDataForPageById(supabase, params.post)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='lg:w-7/12'>

      {profile?.id == post.author_id &&
        <span className='mb-8 italic'>This is your post. Click <Link href={`/write/${post.id}`} className={LinkCSS}>here</Link> to edit it.</span>}

      <h1 className={PostTitleCSS}>
        {post?.title}
      </h1>
      <Link className="text-lg mb-3" href={`/@${post.username}`}>
        <span className="align-middle">by </span> 
        <img className="inline h-8 rounded-sm align-middle" src={post.avatar_url} />
        <span className="align-middle">{post.avatar_url ? ' ' : ''}{post.author_name}</span>
      </Link>
      {post?.content && <div 
        className={`${PostContentCSS} tiptap`}
        dangerouslySetInnerHTML={{ __html: post.content }}></div>}

      <BottomPostBar post={post} />

    </StandardResponsivePage>
  )
}