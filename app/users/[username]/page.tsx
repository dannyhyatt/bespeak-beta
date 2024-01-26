import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile, getProfileById, getProfileByUsername } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId, getPostsByAuthorUsername } from '@/utils/supabase/api/post'
import Link from 'next/link'
import ProfileDisplay from '@/components/ProfileDisplay'

export default async function Index({
  params
} : { params: { username: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const viewingProfile = await getProfileByUsername(supabase, params.username)

  if(!viewingProfile) return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      <div className="text-2xl text-center">Profile not found</div>
    </StandardResponsivePage>
  )
  
  const posts = await getPostsByAuthorUsername(supabase, params.username)

  console.log('received posts', posts)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <ProfileDisplay profile={viewingProfile} supabase={supabase} isCurrentProfile={viewingProfile.id == profile?.id} />
      
      <h1 className="text-xl font-bold mt-8 mb-4">Posts</h1>
      {posts.length != 0 ? <PostList initialPosts={posts}  /> : <div className="text-2xl text-center">No posts yet</div>}

    </StandardResponsivePage>
  )
}
