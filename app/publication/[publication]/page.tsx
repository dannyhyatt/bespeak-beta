import DefaultFooter from "@/components/DefaultFooter"
import DefaultTopBar from "@/components/DefaultTopBar"
import StandardResponsivePage from "@/components/StandardResponsivePage"
import Profile, { getMyProfile } from "@/utils/supabase/api/profile"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export default async function Index({
  params
} : { params: { publication: string } }) {

  const publicationSlug = params.publication

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
    
  return (
    <>
      <div className="flex-1 w-full flex flex-col items-center gap-0">
        <DefaultTopBar isSupabaseConnected={isSupabaseConnected} profile={profile} />

        <main className="w-full flex-grow">
          <div 
            className={`bg-[linear-gradient(rgba(0,0,0,0),hsla(var(--background)/80%)),url('https://unsplash.com/photos/GAM-7l4QzmI/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzA2MzkzMzg4fA&force=true&w=1920')]
                        w-full h-56 pb-4 flex items-end justify-center bg-cover bg-no-repeat bg-bottom`}>
            <h1 className="text-4xl font-extrabold mx-2">Publication Title</h1>
          </div>
        </main>

        <DefaultFooter />
    </div>
    </>
  );

}