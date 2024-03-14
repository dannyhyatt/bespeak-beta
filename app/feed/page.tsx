import { createClient } from '@/utils/supabase/server'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import DefaultTopBar from '@/components/DefaultTopBar'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getFeed, getWeekTopPosts } from '@/utils/supabase/api/post'
import { PostCard } from '@/components/PostCard'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const posts = await getFeed(supabase)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='lg:w-7/12'>
      <h2 className='text-2xl mb-4 underline'>Your Feed</h2>
      <div className='flex flex-col items-center w-full [&>*]:sm:w-[calc(100%+2rem)] [&>*]:w-full [&>*]:mx-[-1rem]'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </StandardResponsivePage>
  )
}
