import Profile, { getAvatarUrl } from "@/utils/supabase/api/profile";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function ProfileCard({ profile } : { profile: Profile }) {
  
  return (
    <Link href={`/@${profile.username}`}
                className="mb-4 rounded-md shadow-lg dark:border-grey-50 border-2 p-4 sm:mx-[-1rem] flex items-center" key={profile.id}>
      <img src={getAvatarUrl(createClient(), profile)} className="h-24 w-24 rounded-md" />
      <div className="ml-4">
        <h1 className="text-xl font-bold">{profile.full_name}</h1>
        <span className="text-base block mb-2">@{profile.username}</span>
        <span className="text-sm line-clamp-2">{profile.bio}</span>
      </div>
    </Link>
  )
}