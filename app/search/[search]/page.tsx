import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Profile, { getMyProfile, getProfileById, getProfilesBySearch } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { getPostsByAuthorId, getPostsBySearch } from '@/utils/supabase/api/post'
import ProfileDisplay from '@/components/ProfileDisplay'
import Link from 'next/link'
import SearchPage from '@/components/SearchPage'
import { getReadlistsBySearch } from '@/utils/supabase/api/readlists'

export default async function Index({
  params
} : { params: { search: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null
  
  const profiles = await getProfilesBySearch(supabase, params.search)

  const posts = await getPostsBySearch(supabase, params.search)

  const lists = await getReadlistsBySearch(supabase, params.search)

  console.log('received profiles', profiles)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} initialSearchQuery={params.search}>

      <SearchPage query={params.search} initialPosts={posts} initialProfiles={profiles} initialLists={lists} />

    </StandardResponsivePage>
  )
}
