'use client'

import Profile, { getAvatarUrl } from "@/utils/supabase/api/profile";
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

export default function UploadAvatar({ profile, onFileAdded } : { profile: Profile, onFileAdded: (file: File) => void }) {

  // const [_, forceRebuild] = useState<number>(0)

  const [avatarUrl, setAvatarUrl] = useState<string>(getAvatarUrl(createClient(), profile))

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if(!e.target.files) return console.error('no files')
    onFileAdded(e.target.files[0])

    setAvatarUrl(URL.createObjectURL(e.target.files[0]))

  }

  return (
    <>
      <label htmlFor="avatar_upload">
        <img
          src={avatarUrl}
          className="h-32 min-w-[8rem] w-32 aspect-square rounded-lg my-2 hover:opacity-70 cursor-pointer border-2"
        />
      </label>
      <input type="file" id="avatar_upload" className='hidden' accept=".png,.jpeg,.heic" onChange={uploadAvatar} />
    </>
  );

}