import StandardResponsivePage from "@/components/StandardResponsivePage"
import Profile, { getMyProfile } from "@/utils/supabase/api/profile"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import CreatePublicationForm from "./CreatePublicationForm"

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')


  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='lg:w-7/12'>
      <h1 className="text-xl font-bold mb-2 mt-4 underline">Start a Publication on Bespeak</h1>
      <p className="mb-4">Create a new publication to share your thoughts, ideas, and stories with the world.</p>
      <CreatePublicationForm />
    </StandardResponsivePage>
    
  )
}
