'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router';
import Profile from '@/utils/supabase/api/profile'
import { useState } from 'react'

export default function AccountButton({profile}: {profile: Profile | undefined}) {

  const supabase = createClient()
  const [ open, setOpen ] = useState<boolean>(false)
  const pathname = usePathname()


  const signOut = async () => {
    await supabase.auth.signOut();
    const router = useRouter();
    router.push('/');
  };

  const handleClick = () => {
    setOpen(!open)
  }

  const handleBlur = () => {
    setOpen(false)
  }

  return profile ? (
    <div onBlur={event => !event.currentTarget.contains(event.relatedTarget) && handleBlur()} className="flex flex-col items-center gap-4">
      <button onClick={handleClick} className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
        {profile.full_name || profile.username || 'Account'}
      </button>
      {open && (
        <div className="flex flex-col absolute mt-10 bg-btn-background rounded-md">
          {pathname !== '/profile' && <Link href='/profile' className="block py-2 px-4 hover:bg-btn-background-hover hover:rounded-md">Profile</Link>}
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
