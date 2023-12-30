import { createClient } from '@/utils/supabase/server'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import Editor from '@/components/LexicalEditor'
import PostTitleField from '@/components/PostTitleField'
import { Suspense, useEffect, useState } from 'react'
import ArticleEditor from '@/components/ArticleEditor'
import { cookies } from 'next/headers'

export default async function Index() {
  const cookieStore = cookies()  
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  console.log('profile', profile)

  return (
    <StandardResponsivePage isSupabaseConnected={profile != null} profile={profile}>
      <Suspense fallback={<div>Loading...</div>}>
        <ArticleEditor />
      </Suspense>
    </StandardResponsivePage>
  )
}
