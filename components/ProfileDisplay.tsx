import Profile, { getAvatarUrl } from "@/utils/supabase/api/profile";
import Link from "next/link";
import EditableProfileField from "./EditableProfileField";
import { LinkCSS } from "./CSSConsts";
import { useState } from "react";
import ExpandableParagraph from "./ExpandableParagraph";
import { SupabaseClient } from "@supabase/supabase-js";

export default function ProfileDisplay({ profile, supabase, isCurrentProfile } : { profile: Profile, supabase: SupabaseClient, isCurrentProfile?: boolean }) {

  return (
    <>
      <h1 className="text-xl font-bold">Profile {isCurrentProfile && <Link href={`/profile/edit`} className={LinkCSS}>(Edit)</Link>}</h1>
      <div className="flex my-4 rounded-md">
        <img className="h-32 aspect-square rounded-lg mr-4" src={getAvatarUrl(supabase, profile)} />
        <span className="flex flex-col py-1 w-[calc(100%-10rem)]">
          <h2 className="font-bold text-3xl">{profile.full_name}</h2>
          <h3 className="before:content-['@'] text-xl text-gray-700 dark:text-gray-300 font-bold">
              {profile?.username}
            </h3>
          <span className="flex-grow"></span>
          <Link className="text-gray-700 dark:text-gray-300 text-lg underline font-bold" href={profile.website || ''}>
            {profile.website}
          </Link>
        </span>
      </div>
      <ExpandableParagraph 
        className={`text-gray-700 dark:text-gray-300 text-xl mb-4 overflow-x-auto`}
      >
        {profile.bio}
      </ExpandableParagraph>
    </>
  )

}