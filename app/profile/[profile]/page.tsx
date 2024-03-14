import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile, getProfileById, isFollowingProfile } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId } from '@/utils/supabase/api/post'
import Link from 'next/link'
import ProfileDisplay from '@/components/ProfileDisplay'
import ProfilePage from '@/components/ProfilePage'
import { getReadlists } from '@/utils/supabase/api/readlists'

export default async function Index({
  params
} : { params: { profile: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
  
  const posts = await getPostsByAuthorId(supabase, params.profile)

  const viewingProfile = await getProfileById(supabase, params.profile)

  const readlists = await getReadlists(supabase, params.profile)
  
  const isFollowing = await isFollowingProfile(supabase, viewingProfile.id)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <ProfilePage profile={profile} posts={posts} initialReadlists={readlists} viewingProfile={viewingProfile} isFollowing={isFollowing} />

    </StandardResponsivePage>
  )
}
