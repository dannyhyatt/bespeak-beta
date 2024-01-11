import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId } from '@/utils/supabase/api/post'
import CreateProfileComponent from '@/components/CreateProfileComponent'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  // so you can't create profile when you already have one
  if(profile) return redirect('/profile')

  const user = await supabase.auth.getUser()
  if(!user.data.user) return redirect('/login')

  return (
      
    <main className="flex-1 flex flex-col m-auto w-full sm:w-6/12 lg:w-4/12 animate-in px-4">
      <h1 className="text-xl font-bold mb-2 sm:mt-56 md:mt-40 mt-4">Welcome to bespeak!<br />Create Your Profile:</h1>
      <CreateProfileComponent userId={user.data.user?.id} />
    </main>
    
  )
}
