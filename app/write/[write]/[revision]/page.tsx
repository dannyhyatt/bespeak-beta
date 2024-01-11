import { createClient } from '@/utils/supabase/server'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { Suspense } from 'react'
import ArticleEditor from '@/components/ArticleEditor'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPostDataForPageById, getRevision, getRevisionsByPostId } from '@/utils/supabase/api/post'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import RevisionsEditorBar from '@/components/RevisionsEditorBar'

export default async function Index({
  params
} : { params: { write: string, revision: string } }) {
  const cookieStore = cookies()  
  const supabase = createClient(cookieStore)

  console.log('params', params)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  if(!profile) return redirect('/login')

  const revision = await getRevision(supabase, params.revision)

  const allRevisions = await getRevisionsByPostId(supabase, params.write)

  return (
    <StandardResponsivePage isSupabaseConnected={profile != null} profile={profile} className='resize-x overflow-auto max-w-[min(100%,56rem)] lg:w-7/12'>
      <Suspense fallback={<div>Loading...</div>}>

        <RevisionsEditorBar revisions={allRevisions} currentRevisionId={revision.id} currentPostId={params.write} />

        <span className='italic mb-8'>Viewing revision from {format(parseISO(revision.created_at), "LLLL d, yyyy 'at' h:m a")}</span>

        <h1 className={`bg-transparent cursor-text outline-none overflow-visible text-2xl mb-1 font-semibold resize-none dark:text-white`}>
          {revision.title}
        </h1>
        {revision.content && <div dangerouslySetInnerHTML={{ __html: revision.content }}></div>}
      </Suspense>
    </StandardResponsivePage>
  )
}
