import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import EditableProfileField from '@/components/EditableProfileField'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import PostList from '@/components/PostList'
import { SupabaseClient } from '@supabase/supabase-js'
import { Revision, Post, getPostsByAuthorId } from '@/utils/supabase/api/post'

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  console.log('received profile: ', profile)

  if(!profile) return redirect('/login')
  
  const posts = await getPostsByAuthorId(supabase, profile.id)

  console.log('received posts', posts)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      
      <h1 className="text-xl font-bold underline mb-2 ">Profile</h1>
      <EditableProfileField className="font-bold text-4xl mb-1"
        profile={profile} displayFieldName="Name" dbField="full_name" initialValue={profile?.full_name} />
      <EditableProfileField className="before:content-['@'] text-xl text-gray-700 dark:text-gray-300 mb-4"
        profile={profile} displayFieldName="Username" dbField="username" initialValue={profile?.username} />
        <EditableProfileField className="text-gray-700 dark:text-gray-300 text-xl mb-4"
          profile={profile} displayFieldName="Bio" dbField="bio" initialValue={profile?.website} />
        <EditableProfileField className="text-gray-700 dark:text-gray-300 text-lg underline"
          profile={profile} displayFieldName="Website" dbField="website" initialValue={profile?.website} />
      
      <h1 className="text-xl font-bold underline mb-2 mt-8 ">Posts</h1>
      {posts.length != 0 ? <PostList initialPosts={posts}  /> : <div className="text-2xl">No posts yet</div>}
    </StandardResponsivePage>
  )
}
