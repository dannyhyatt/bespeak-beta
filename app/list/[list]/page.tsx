import ReadlistFollowButton from "@/components/FollowButtons/ReadlistFollowButton";
import { PostCard } from "@/components/PostCard";
import StandardResponsivePage from "@/components/StandardResponsivePage";
import Profile, { getMyProfile } from "@/utils/supabase/api/profile";
import { getPostsByReadlist, getReadlistById, getReadlistByIdWithProfile, isFollowingReadlist } from "@/utils/supabase/api/readlists";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Index({
  params
} : { params: { list: string } }) {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const profile: Profile | undefined = await getMyProfile(supabase)
  const isSupabaseConnected = profile != null

  const readlist = await getReadlistByIdWithProfile(supabase, params.list)

  const posts = await getPostsByReadlist(supabase, params.list)

  const isFollowing = await isFollowingReadlist(supabase, params.list)

  return (
    <StandardResponsivePage isSupabaseConnected={isSupabaseConnected} profile={profile}>
      <h1 className="text-xl font-bold mb-4">
        <span className="border-b-2 border-black dark:border-white">
          {readlist.name}{' '}
          <span className="text-lg font-normal">by <Link href={`/@${readlist.username}`}>@{readlist.username}</Link></span>
        </span>
        {' '}
        <ReadlistFollowButton isFollowing={isFollowing} readlist={readlist} /> 
      </h1>
      {
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      }
      {
        posts.length == 0 && <div>This readlist is empty.</div>
      }
    </StandardResponsivePage>
  );

}