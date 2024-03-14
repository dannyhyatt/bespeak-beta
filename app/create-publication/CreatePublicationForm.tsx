'use client'

import { createPublication } from "@/utils/supabase/api/publication"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreatePublicationForm() {

  const router = useRouter()

  const [title, setTitle] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [networkStatus, setNetworkStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')

  const handleClick = async () => {
    setNetworkStatus('loading')
    const publication = await createPublication(createClient(), title, slug, description)
    if(publication) {
      router.push(`/~${slug}`)
    } else {
      setNetworkStatus('error')
    }
  }
  
  return (
    <div>
        <label className="block mb-2" htmlFor="title">Title</label>
        <input className="w-full p-2 mb-4 border-2 rounded-md" type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} />
        <label className="block mb-2" htmlFor="slug">URL Slug</label>
        <input className="w-full p-2 border-2 rounded-md" type="text" name="slug" id="slug" value={slug} onChange={e => setSlug(e.target.value)} />
        <p className="block mb-4 w-full text-sm text-left">Your publication will be available at https://bespeak.com/~{slug}</p>
        <label className="block mb-2" htmlFor="description">Description</label>
        <textarea className="w-full p-2 mb-4 border-2 rounded-md" name="description" id="description" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
        <button className="w-full p-2 bg-blue-600 text-white rounded-md" onClick={networkStatus == 'idle' ? handleClick : () => {}}>Create Publication</button>
    </div>
  )

}