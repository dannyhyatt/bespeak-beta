'use client'

import { useState } from "react";
import { ActionButtonCSS, ButtonCSS } from "../CSSConsts";
import Profile, { followProfile, unfollowProfile } from "@/utils/supabase/api/profile";
import { createClient } from "@/utils/supabase/client";
import { IconCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";
import Readlist, { followReadlist, unfollowReadlist } from "@/utils/supabase/api/readlists";

export default function ReadlistFollowButton({ isFollowing, readlist } : { isFollowing: boolean, readlist: Readlist }) {

  const [following, setFollowing] = useState<boolean>(isFollowing)
  const [loading, setLoading] = useState<boolean>(false)

  const follow = async () => {
    console.log('following')
    setLoading(true)
    await followReadlist(createClient(), readlist.id)
    setFollowing(true)
    setLoading(false)
  }

  const unfollow = async () => {
    console.log('unfollowing')
    setLoading(true)
    await unfollowReadlist(createClient(), readlist.id)
    setFollowing(false)
    setLoading(false)
  }

  return (
    <button className={`inline-flex gap-2 text-base bg-gray-200 text-black font-semibold px-3 py-1 align-baseline mb-0.5 ml-1.5 rounded-md mr-2 cursor-pointer hover:bg-gray-300`} onClick={following ? unfollow : follow} disabled={loading}>
      {following ? 'Following' : 'Follow'}
      {following && <IconCheck strokeWidth='1.7px' />}
    </button>
  );
}