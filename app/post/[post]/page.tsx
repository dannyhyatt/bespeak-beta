import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getAvatarUrl, getMyProfile } from '@/utils/supabase/api/profile'
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
      <Link className="sm:text-sm md:text-base lg:text-lg mb-6 mt-2" href={`/@${post.username}`}>
        <span className="align-middle">by </span> 
        { post.avatar && <img className="inline lg:h-12 md:h-10 h-8 mx-1 md:mx-2 aspect-square rounded-md align-middle" src={getAvatarUrl(supabase, {
          ...post,
          id: post.author_id,
          full_name: post.author_name,
          username: post.username,
          updated_at: ''
        })} /> }
        <span className="align-middle">{post.avatar ? ' ' : ''}{post.author_name}</span>
      </Link>
      
      {
        <div 
          className={`${PostContentCSS}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      }

      <BottomPostBar post={post} userID={profile?.id} />

    </StandardResponsivePage>
  )
}