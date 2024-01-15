import { Post, PostWithRevision } from "@/utils/supabase/api/post";
import { format, parseISO } from "date-fns";
import Link from "next/link";
const { convert } = require('html-to-text'); // Import the library


export function PostCard({ post } : { post: PostWithRevision }) {

  if(!post) return

  return (
    <Link href={`/post/${post.id}`} className="flex flex-col mb-4 rounded-md shadow-lg dark:border-grey-50 border-2 p-4 sm:mx-[-1rem]">
      {post.cover_image && <img src={post.cover_image} className="mb-2" />}
      <div className="text-2xl font-bold">{post?.title}</div>
      <div className="line-clamp-3 my-2">{convert(post.content)}</div>
      <div className="text-gray-700 dark:text-gray-300 text-sm">{format(parseISO(post.created_at), 'LLLL d, yyyy')}</div>
    </Link>
  )

}