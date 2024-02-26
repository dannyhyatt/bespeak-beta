import { createClient } from '@/utils/supabase/server'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import DefaultTopBar from '@/components/DefaultTopBar'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { getWeekTopPosts } from '@/utils/supabase/api/post'
import { PostCard } from '@/components/PostCard'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const posts = await getWeekTopPosts(supabase)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='lg:w-7/12'>
      <h3 className='text-lg'>Welcome to</h3>
      <h1 className='text-5xl mb-8 border-b-2 font-serif'>Bespeak</h1>
      <h2 className='text-2xl mb-4 underline'>Trending This Week</h2>
      <div className='flex flex-col items-center w-full [&>*]:sm:w-[calc(100%+2rem)] [&>*]:w-full [&>*]:mx-[-1rem]'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </StandardResponsivePage>
  )
}
