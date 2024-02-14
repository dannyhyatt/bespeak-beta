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
import UploadAvatar from '@/components/UploadAvatar'
import EditProfilePage from './EditProfilePage'

export default async function Index() {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')
  
  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <h1>Edit Your Profile</h1>
      
      <EditProfilePage profile={profile} />

    </StandardResponsivePage>
  )
}
