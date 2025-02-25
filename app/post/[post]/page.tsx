import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getAvatarUrl, getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getPostDataForPageById, getReaction } from '@/utils/supabase/api/post'
import Link from 'next/link'
import BottomPostBar from '@/components/BottomPostBar'
import { LinkCSS, PostContentCSS, PostTitleCSS } from '@/components/CSSConsts'

import '../../../src/styles/editor.css'
import { format, parseISO } from 'date-fns'
import PostContent from '@/components/PostContent'

export default async function Index({
  params
}: { params: { post: string } }) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const post = await getPostDataForPageById(supabase, params.post)

  let reaction: 'like' | 'dislike' | undefined = undefined

  try {
    const res = await getReaction(supabase, post.id)
    if (res) reaction = res.is_like ? 'like' : 'dislike'
  } catch (e) {
    // keep loading page even if there's an error getting reaction
  }

  console.log('got reaction', reaction)

  console.log('got post', post)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='lg:w-7/12'>

      {profile?.id == post.author_id &&
        <span className='mb-8 italic'>This is your post. Click <Link href={`/write/${post.id}`} className={LinkCSS}>here</Link> to edit it.</span>}

      <h1 className={PostTitleCSS}>
        {post.title}
      </h1>
      <span className="sm:text-sm md:text-base lg:text-lg mt-2 mb-6">
        <span className="align-middle">by </span>
        <Link href={`/@${post.username}`}>
          {post.avatar && <img className="inline lg:h-12 md:h-10 h-8 mx-1 md:mx-2 aspect-square rounded-md align-middle" src={getAvatarUrl(supabase, {
            ...post,
            id: post.author_id,
            full_name: post.author_name,
            username: post.username,
            updated_at: ''
          })} />}
          <span className="align-middle">{post.avatar ? ' ' : ''}{post.author_name}</span>
        </Link>
        <span className="align-middle"> on {format(parseISO(post.created_at), 'MMMM d, yyyy')}</span>
      </span>

      <PostContent innerHTML={post.content} />

      <div className='flex mt-4'>
        {post.tags.map(tag => (
          <Link href={`/topic/${tag}`} key={tag} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 mr-2 py-1 px-2 rounded-md">
            {tag}
          </Link>
        ))}
      </div>

      <BottomPostBar post={post} userID={profile?.id} initialReaction={reaction} />

    </StandardResponsivePage>
  )
}