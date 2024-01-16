import { createClient } from '@/utils/supabase/server'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { Suspense } from 'react'
import ArticleEditor from '@/components/ArticleEditor'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPostDataForPageById } from '@/utils/supabase/api/post'

export default async function Index({
  params
} : { params: { write: string } }) {
  const cookieStore = cookies()  
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')

  const post = await getPostDataForPageById(supabase, params.write)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile} className='resize-x max-w-[min(100%,56rem)] lg:w-7/12 items-stretch overflow-visible h-auto'>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleEditor post={post} />
      </Suspense>
    </StandardResponsivePage>
  )
}
