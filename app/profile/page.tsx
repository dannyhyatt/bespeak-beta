import { createClient } from '@/utils/supabase/server'
import ConnectSupabaseSteps from '@/components/ConnectSupabaseSteps'
import SignUpUserSteps from '@/components/SignUpUserSteps'
import Header from '@/components/Header'
import { cookies } from 'next/headers'
import DefaultTopBar from '@/components/DefaultTopBar'
import { redirect } from 'next/navigation'
import { profile } from 'console'
import DefaultFooter from '@/components/DefaultFooter'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')

  console.log('profile', profile)
  

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      <EditableProfileField className="font-bold text-4xl mb-1"
        profile={profile} displayFieldName="Name" dbField="full_name" initialValue={profile?.full_name} />
      <EditableProfileField className="before:content-['@'] text-xl text-gray-700 mb-4"
        profile={profile} displayFieldName="Username" dbField="username" initialValue={profile?.username} />
      <EditableProfileField className="text-gray-700 text-xl"
        profile={profile} displayFieldName="Website" dbField="website" initialValue={profile?.website} />
    </StandardResponsivePage>
  )
}
