'use client'

import { useState } from "react";
import { ActionButtonCSS, ButtonCSS } from "../CSSConsts";
import Profile, { followProfile, unfollowProfile } from "@/utils/supabase/api/profile";
import { createClient } from "@/utils/supabase/client";
import { IconCheck, IconUserMinus, IconUserPlus } from "@tabler/icons-react";

export default function ProfileFollowButton({ isFollowing, profile } : { isFollowing: boolean, profile: Profile }) {

  const [following, setFollowing] = useState<boolean>(isFollowing)
  const [loading, setLoading] = useState<boolean>(false)

  const follow = async () => {
    console.log('following')
    setLoading(true)
    await followProfile(createClient(), profile.id)
    setFollowing(true)
    setLoading(false)
  }

  const unfollow = async () => {
    console.log('unfollowing')
    setLoading(true)
    await unfollowProfile(createClient(), profile.id)
    setFollowing(false)
    setLoading(false)
  }

  return (
    <button className={`flex gap-2 bg-gray-200 text-black font-semibold px-3 py-2 rounded-md mr-2 cursor-pointer hover:bg-gray-300`} onClick={following ? unfollow : follow} disabled={loading}>
      {following ? 'Following' : 'Follow'}
      {following && <IconCheck strokeWidth='1.7px' />}
    </button>
  );
}