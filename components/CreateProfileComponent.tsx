'use client'

import Profile, { setProfile } from "@/utils/supabase/api/profile"
import EditableProfileField from "./EditableProfileField"
import { useRouter } from "next/navigation"
import WelcomeProfileField from "./WelcomeProfileField"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function CreateProfileComponent({
  userId
} : { userId: string}) {

  const router = useRouter()

  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [website, setWebsite] = useState<string>('')

  const [usernameTaken, setUsernameTaken] = useState<boolean>(false)

  const nameValidator = (name: string) => {
    return name.length > 0
  }

  const usernameValidator = (username: string) => {
    return username.length > 3 && username.length < 20 && /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)?[a-zA-Z0-9]+$/.test(username)
  }

  const websiteValidator = (website: string) => {
    return website.length < 2000
  }

  const bioValidator = (bio: string) => {
    return bio.length < 2000
  }

  const allValid = () => {
    return nameValidator(name) && usernameValidator(username) && bioValidator(bio) && websiteValidator(website)
  }

  const cancel = async () => {
    await createClient().auth.signOut()
    router.replace('/login')
  }

  const createProfile = async () => {

    try {
      const profile = await setProfile(createClient(), {
        id: userId,
        full_name: name,
        username: username,
        bio: bio,
        website: website
      })
      router.replace('/profile')
    } catch(e) {
      const usernameTaken = (e as Error).message.includes("duplicate key value violates unique constraint \"profiles_username_key\"")
      setUsernameTaken(usernameTaken)
      console.log('got error:', e)
    }
  }


  return (
    <>
      <WelcomeProfileField className="font-bold text-4xl mt-8 border-b" placeholder='Your Name'
        displayFieldName="Name" onChange={setName} value={name} isValid={nameValidator(name)} />
      <WelcomeProfileField className="before:content-['@'] text-xl text-gray-700 dark:text-gray-300 mt-8 border-b" placeholder='Your Username'
        displayFieldName="Username" onChange={setUsername} value={username} isValid={usernameValidator(username)} />
      {usernameTaken ? <div className="text-red-600">Username is taken</div> : null}
      <WelcomeProfileField className="text-gray-700 dark:text-gray-300 text-xl border-b mt-8" placeholder='Your Bio (optional!)'
        displayFieldName="Bio" onChange={setBio} value={bio} isValid={bioValidator(bio)} useTextArea={true} />
      <WelcomeProfileField className="text-gray-700 dark:text-gray-300 text-xl border-b mt-12" placeholder='Your Website (optional!)'
        displayFieldName="Website" onChange={setWebsite} value={website} isValid={websiteValidator(website)} />
      
      <span className="flex justify-between mt-4 flex-wrap-reverse gap-2">
        <button className=" bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-bold py-2 px-4 rounded grow" onClick={cancel}>Cancel & Sign Out</button>
        <button
          disabled={!allValid()} 
          className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-200 dark:hover:bg-gray-100 text-gray-100 dark:text-gray-900 font-bold py-2 px-4 rounded grow" onClick={createProfile}>Create Profile</button>
      </span>
    </>
  )

}