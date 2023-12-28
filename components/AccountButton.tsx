'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Profile from '@/utils/supabase/api/profile'
import { useState } from 'react'

export default function AccountButton({profile}: {profile: Profile | undefined}) {

  const supabase = createClient()
  const [ open, setOpen ] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  const signOut = async () => {
    console.log('signing out')
    await supabase.auth.signOut()
    console.log('signed out')
    if(pathname === '/') router.refresh()
    else router.replace('/')
  }

  const handleClick = () => {
    setOpen(!open)
  }

  const handleBlur = () => {
    setOpen(false)
  }

  return profile ? (
    <div onBlur={e => {}/* event => !event.currentTarget.contains(event.relatedTarget) && handleBlur() */} className="flex flex-col items-end gap-4">
      <button onClick={handleClick} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-base">
        {profile.full_name || profile.username || 'Account'}
      </button>
      {open && (
        <div className="flex flex-col absolute mt-11 bg-btn-background rounded-md text-center">
          {pathname !== '/write' && <Link href='/write' className="block py-2 px-4 hover:bg-btn-background-hover hover:rounded-md">Write</Link>}
          {pathname !== '/profile' && <Link href='/profile' className="block py-2 px-4 hover:bg-btn-background-hover hover:rounded-md">Your Profile</Link>}
          <button onClick={signOut} className="block py-2 px-4 hover:bg-btn-background-hover hover:rounded-md">Sign out</button>
        </div>
      )}
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  )
}
