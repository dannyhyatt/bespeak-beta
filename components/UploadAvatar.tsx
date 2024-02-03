'use client'

import Profile, { getAvatarUrl } from "@/utils/supabase/api/profile";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function UploadAvatar({ profile } : { profile: Profile }) {

  const [_, forceRebuild] = useState<number>(0)

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if(!e.target.files) return console.error('no files')

    const avatarFile = e.target.files[0]
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
    await fetch(new URL(createClient()
      .storage
      .from('avatars')
      .getPublicUrl(`${profile.username}.png`).data.publicUrl), {cache: "no-cache"})

    forceRebuild(i => i + 1)
  }

  return (
    <>
      <label htmlFor="avatar_upload">
        <img
          src={`${getAvatarUrl(createClient(), profile)}?time=${Date.now()}`}
          className="h-32 aspect-square rounded-lg my-2 hover:opacity-70 cursor-pointer"
        />
      </label>
      <input type="file" id="avatar_upload" className='hidden' accept=".png,.jpeg,.heic" onChange={uploadAvatar} />
    </>
  );

}