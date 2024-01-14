import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Profile, { getMyProfile, getProfileById, getProfilesBySearch } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { getPostsByAuthorId } from '@/utils/supabase/api/post'
import ProfileDisplay from '@/components/ProfileDisplay'
import Link from 'next/link'

export default async function Index({
  params
} : { params: { search: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
  
  const profiles = await getProfilesBySearch(supabase, params.search)

  console.log('received profiles', profiles)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} initialSearchQuery={params.search}>
      
      <h1 className="text-xl font-bold mt-8 mb-4">People</h1>
      
      {profiles.length != 0 ? profiles.map(profile => (
        <Link href={`/@${profile.username}`}
            className="mb-4 rounded-md shadow-lg dark:border-grey-50 border-2 p-4 sm:mx-[-1rem]" key={profile.id}>
          <h3 className="text-xl font-bold mb-2">{profile.full_name}</h3>
          <h5 className="text-lg mb-2">{profile.username}</h5>
        </Link>
      )) : <div className="text-2xl text-center">No profiles found</div>}

    </StandardResponsivePage>
  )
}
