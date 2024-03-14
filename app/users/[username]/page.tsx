import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile, getProfileById, getProfileByUsername, isFollowingProfile } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId, getPostsByAuthorUsername } from '@/utils/supabase/api/post'
import Link from 'next/link'
import ProfileDisplay from '@/components/ProfileDisplay'
import ProfilePage from '@/components/ProfilePage'
import { getReadlists } from '@/utils/supabase/api/readlists'

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

  const readlists = await getReadlists(supabase, viewingProfile.id)
  
  const isFollowing = await isFollowingProfile(supabase, viewingProfile.id)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <ProfilePage profile={profile} posts={posts} initialReadlists={readlists} viewingProfile={viewingProfile} isFollowing={isFollowing} />

    </StandardResponsivePage>
  )
}
