import Profile from "@/utils/supabase/api/profile";
import Link from "next/link";
import EditableProfileField from "./EditableProfileField";

export default function ProfileDisplay({ profile, isCurrentProfile } : { profile: Profile, isCurrentProfile?: boolean }) {

  return (
    <>
      <h1 className="text-xl font-bold mb-2">Profile {isCurrentProfile && <Link href={`/profile/edit`} className="text-sky-600 hover:underline">(Edit)</Link>}</h1>
      <EditableProfileField className="font-bold text-4xl mb-1"
        profile={profile} displayFieldName="Name" dbField="full_name" initialValue={profile?.full_name} disabled />
      <EditableProfileField className="before:content-['@'] text-xl text-gray-700 dark:text-gray-300 mb-4"
        profile={profile} displayFieldName="Username" dbField="username" initialValue={profile?.username} disabled />
      <p className="text-gray-700 dark:text-gray-300 text-xl mb-4 overflow-x-auto">{profile.bio}</p>
      <Link className="text-gray-700 dark:text-gray-300 text-lg underline font-bold" href={profile.website || ''}>
        {profile.website}
      </Link>
    </>
  )

}