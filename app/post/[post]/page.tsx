import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getPostDataForPageById } from '@/utils/supabase/api/post'

export default async function Index({
  params
} : { params: { post: string } }) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')
  
  const post = await getPostDataForPageById(supabase, params.post)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      <h1 className={`bg-transparent cursor-text outline-none overflow-visible text-2xl px-[10px] mb-4 font-semibold resize-none px-0`}>
        {post?.title}
      </h1>
      <p className="text-lg">
        <span className="align-middle">by </span> 
        <img className="inline h-8 rounded-sm align-middl" src={post.avatar_url} />
        <span className="align-middle"> {post.author_name}</span>
      </p>
      {post?.content && <div dangerouslySetInnerHTML={{ __html: post.content }}></div>}
    </StandardResponsivePage>
  )
}