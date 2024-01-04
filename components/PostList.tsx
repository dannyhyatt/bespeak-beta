'use client'

import { Post, PostWithRevision } from "@/utils/supabase/api/post";
import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

export default function PostList({ initialPosts }: { initialPosts?: PostWithRevision[]}) {

  console.log('initial posts', initialPosts)

  return (
    <div className="flex flex-col">
      {initialPosts?.map(post => {
        console.log('post', post)
        return  <PostCard post={post} key={post.id} />
      })}
    </div>
  )

}