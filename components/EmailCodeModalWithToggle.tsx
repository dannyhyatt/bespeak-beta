'use client'

import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { XIcon } from "./Icons"
import { useRouter } from "next/navigation"

export default function EmailCodeModalWithToggle({ initialEmail }: { initialEmail?: string }) {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>(initialEmail ?? '')
  const [code, setCode] = useState<string>('')

  const router = useRouter()

  const verifyOTP = async () => {
    console.log('submitting')
    const { error } = await createClient().auth.verifyOtp({
      email: email,
      token: code,
      type: 'email'
    })
    if (error) {
      console.log('error', error)
    } else {
      console.log('success')
      router.push('/profile')
    }
  }

  return (
    <>
      <p className="text-center text-sm underline text-gray-700 dark:text-gray-300 mt-8 cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>I have an email code</p>
      {/* for the grey background overlay */}
      {isModalOpen && 
        <div onClick={(e) => setIsModalOpen(false)} className="top-[-100vh] left-[-100vw] right-[-100vw] bottom-[-100vh] opacity-50 bg-black absolute"></div>}
      <div className={`fixed bg-background border-2 rounded-md left-0 right-0 m-4 shadow-black ${!isModalOpen && 'hidden'}`}>
        <div className='flex-1 flex flex-col w-full sm:max-w-md p-2 justify-center gap-2 h-full'>
          <div className="ml-auto mt-2 mr-2 aspect-square cursor-pointer" onClick={() => setIsModalOpen(false)}><XIcon /></div>
          <div className="text-lg font-medium text-center mb-2 mx-2">Enter your email and code:</div>
          <input className="border-2 border-gray-300 rounded-md p-2 mx-2 bg-background" type="text" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="flex flex-row gap-2 mx-2 mb-4">
            <input className="w-full border-2 border-gray-300 rounded-md p-2 bg-background" type="text" inputMode="numeric" placeholder="Code"
              value={code} onChange={(e) => setCode(e.target.value)} />
            <button className="bg-btn-background hover:bg-btn-background-hover text-foreground rounded-md px-4 py-2" onClick={() => { verifyOTP() }}>Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}