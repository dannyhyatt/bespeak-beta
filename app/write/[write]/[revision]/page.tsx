'use client'

import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import StandardResponsivePage from '@/components/StandardResponsivePage'
import { Suspense } from 'react'
import ArticleEditor from '@/components/ArticleEditor'
import { cookies } from 'next/headers'
import { redirect, useRouter } from 'next/navigation'
import { getPostDataForPageById, getRevision, getRevisionsByPostId } from '@/utils/supabase/api/post'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import RevisionsEditorBar from '@/components/RevisionsEditorBar'
import { LinkCSS, PostContentCSS } from '@/components/CSSConsts'
import { createClient } from '@/utils/supabase/client'

export default async function Index({
  params
} : { params: { write: string, revision: string } }) {
  const supabase = createClient()
  const router = useRouter()

  console.log('params', params)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const postId = params.write
  const revisionId = params.revision

  if(!profile) return redirect('/login')

  const revision = await getRevision(supabase, revisionId)

  const allRevisions = await getRevisionsByPostId(supabase, postId)

  const setAsCurrentRevision = async () => {
    await supabase.from('posts').update({
      'revision_id' : revisionId
    }).eq('id', postId)
    router.push(`/post/${postId}`)
    router.refresh()
  }

  const setNoCurrentRevision = async () => {
    await supabase.from('posts').update({
      'revision_id' : null
    }).eq('id', postId)
    router.push(`/write/${postId}`)
    router.refresh()
  }

  return (
    <StandardResponsivePage isSupabaseConnected={profile != null} profile={profile} className='resize-x max-w-[min(100%,56rem)] lg:w-7/12 items-stretch overflow-visible h-auto'>
      <Suspense fallback={<div>Loading...</div>}>

        <RevisionsEditorBar revisions={allRevisions} currentRevisionId={revision.id} currentPostId={params.write} />

        <span className='italic'>Viewing revision from {format(parseISO(revision.created_at), "LLLL d, yyyy 'at' h:mm a")}.</span>
        <span className='mb-8'>
          Click <span className={LinkCSS} onClick={setAsCurrentRevision}>here</span> to set this as the public-facing revision for this article. 
          Click <span className={LinkCSS} onClick={setNoCurrentRevision}>here</span> to remove the public-facing revision for this article.
        </span>

        <h1 className={`bg-transparent cursor-text outline-none overflow-visible text-2xl mb-1 font-semibold resize-none dark:text-white`}>
          {revision.title}
        </h1>
        {revision.content && <div className={PostContentCSS}
          dangerouslySetInnerHTML={{ __html: revision.content }}></div>}
      </Suspense>
    </StandardResponsivePage>
  )
}
