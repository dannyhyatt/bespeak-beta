import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId } from '@/utils/supabase/api/post'
import ProfileDisplay from '@/components/ProfileDisplay'
import ProfilePage from '@/components/ProfilePage'
import { getReadlists } from '@/utils/supabase/api/readlists'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')
  
  const posts = await getPostsByAuthorId(supabase, profile.id)

  const readlists = await getReadlists(supabase, profile.id)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <ProfilePage profile={profile} posts={posts} readlists={readlists} viewingProfile={profile} />
      
    </StandardResponsivePage>
  )
}
