import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile, getProfileById } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId } from '@/utils/supabase/api/post'
import Link from 'next/link'
import ProfileDisplay from '@/components/ProfileDisplay'

export default async function Index({
  params
} : { params: { profile: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
  
  const posts = await getPostsByAuthorId(supabase, params.profile)

  const viewingProfile = await getProfileById(supabase, params.profile)

  console.log('received posts', posts)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <ProfileDisplay profile={viewingProfile} supabase={supabase} isCurrentProfile={viewingProfile.id == profile?.id} />
      
      <h1 className="text-xl font-bold mt-8 mb-4">Posts</h1>
      {posts.length != 0 ? <PostList initialPosts={posts}  /> : <div className="text-2xl text-center">No posts yet</div>}
      
    </StandardResponsivePage>
  )
}
