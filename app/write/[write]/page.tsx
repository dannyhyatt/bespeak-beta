import { createClient } from '@/utils/supabase/server'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import Editor from '@/components/LexicalEditor'
import PostTitleField from '@/components/PostTitleField'
import { Suspense, useEffect, useState } from 'react'
import ArticleEditor from '@/components/ArticleEditor'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import { getPostDataForPageById } from '@/utils/supabase/api/post'

export default async function Index({
  params
} : { params: { write: string } }) {
  const cookieStore = cookies()  
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const post = await getPostDataForPageById(supabase, params.write)

  return (
    <StandardResponsivePage isSupabaseConnected={profile != null} profile={profile} className='resize-x overflow-auto max-w-[min(100%,56rem)] lg:w-7/12'>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleEditor post={post} />
      </Suspense>
    </StandardResponsivePage>
  )
}
