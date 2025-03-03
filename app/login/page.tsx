import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { MouseEventHandler, useState } from 'react'
import ActionButton from '@/components/ActionButton'
import LoginWithGoogleButton from '@/components/LoginWithGoogleButton'
import Profile, { getMyProfile } from '@/utils/supabase/api/profile'
import EmailCodeModalWithToggle from '@/components/EmailCodeModalWithToggle'
import next from 'next'

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string | undefined, next: string | undefined }
}) {
  const signInWithEmail = async (formData: FormData) => {
    'use server'

    console.log('hello');

    const email = formData.get('email') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const origin = headers().get('origin')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback${searchParams.next ? `?next=${searchParams.next}` : ''}`,
      }
    })

    if (error) {
      console.log('error', error)
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check your email to continue sign in process')
  }


  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const user = await supabase.auth.getUser()
  const profile: Profile | undefined = await getMyProfile(supabase)

  if (profile && searchParams.next) return redirect(searchParams.next)
  if (profile) return redirect('/profile')
  if (user.data.user) return redirect('/create-profile')

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <div className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <form
          action={signInWithEmail}
          className="contents"
        >
          <label className="text-md w-full" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="email"
            placeholder="you@example.com"
            id="email"
            required
            autoComplete="email"
          />
          <ActionButton type="submit">
            Sign In
          </ActionButton>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>

        <hr className="my-4" />

        <LoginWithGoogleButton next={searchParams.next} />

        <EmailCodeModalWithToggle />

      </div>
    </div>
  )
}
