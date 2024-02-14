'use client'

import { ActionButtonCSS, ButtonCSS } from "@/components/CSSConsts"
import UploadAvatar from "@/components/UploadAvatar"
import Profile, { getAvatarUrl } from "@/utils/supabase/api/profile"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"

export default function EditProfilePage({ profile } : { profile: Profile }) {

  const supabase = createClient()
  const router = useRouter()

  const [saveBtnText, setSaveBtnText] = useState<string>('Save')

  const [name, setName] = useState<string>(profile.full_name)
  const [username, setUsername] = useState<string>(profile.username)
  const [website, setWebsite] = useState<string>(profile.website || '')
  const [bio, setBio] = useState<string>(profile.bio || '')

  let avatarFile: File | undefined = undefined

  const onFileAdded = async (file: File) => {
    avatarFile = file
  }

  const onSave = async () => {

    setSaveBtnText('Saving...')

    if(avatarFile) {

      console.log('uploading avatar...')

      const { data, error } = await createClient()
        .storage
        .from('avatars')
        .upload(`${profile.id}`, avatarFile, {
          cacheControl: '300', // 5 minutes
          upsert: true,
        })

      if (error) {
        console.error(error)
        return
      }

      // this refreshes the cache for other pages
      console.log('refreshing avatar url...')
      await fetch(new URL(createClient()
        .storage
        .from('avatars')
        .getPublicUrl(`${profile.id}`).data.publicUrl), {cache: "no-cache"})

      console.log('done with avatar')

    }

    if(name != profile.full_name || username != profile.username || website != profile.website || bio != profile.bio) {

      console.log('updating profile...')

      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          username: username,
          website: website,
          bio: bio,
        })
        .match({ id: profile.id })

      if (error) {
        console.error(error)
        return
      }

      console.log('done with profile')

    }

    window.location.href = '/profile'

  }

  return (
    <div>
      <div className="flex justify-between mt-4 mr-2">
        <button className={ButtonCSS} onClick={_ => router.back()}>
          Back
        </button>
        <button className={ActionButtonCSS} onClick={onSave}>
          {saveBtnText}
        </button> 
      </div>
      <div className="flex my-4 rounded-md sm:mx-[-1rem] gap-2">
        <UploadAvatar profile={profile} onFileAdded={onFileAdded} />
        <span className="flex flex-col py-2 flex-grow">
          <input 
            className="font-bold text-3xl bg-background border-2 rounded-md px-1 min-w-0 w-full" 
            value={name} onChange={e => setName(e.target.value)}
          />
          <span className="border-2 text-xl rounded-md px-1 flex items-center">
            @
            <input 
              className="text-xl text-gray-700 dark:text-gray-300 font-bold bg-background flex-grow"
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </span>
          <span className="flex-grow"></span>
          <input 
            className="text-gray-700 dark:text-gray-300 text-lg underline font-bold bg-background px-1 border-2 rounded-md"
            value={website} onChange={e => setWebsite(e.target.value)}
          />
        </span>
      </div>
      <ReactTextareaAutosize 
        className={`text-gray-700 dark:text-gray-300 text-xl mb-4 overflow-x-auto sm:mx-[-0.5rem] bg-background w-full border-2 rounded-md px-1`}
        value={bio} onChange={e => setBio(e.target.value)}
      />
    </div>
  )
}