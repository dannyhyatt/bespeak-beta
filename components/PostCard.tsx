import { Post, PostWithRevision } from "@/utils/supabase/api/post";
import { getAvatarUrl } from "@/utils/supabase/api/profile";
import { createClient } from "@/utils/supabase/client";
import { IconEyeOff, IconMessage, IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
const { convert } = require('html-to-text'); // Import the library


export function PostCard({ post, displayAuthor }: { post: PostWithRevision, displayAuthor?: boolean }) {

  if (!post) return

  return (
    <Link href={`/post/${post.id}`} className="flex flex-col mb-4 rounded-md shadow-lg hover:shadow-xl transition-all dark:border-grey-50 border-2 p-4 sm:mx-[-1rem]">
      {post.cover_image && <img src={post.cover_image} className="mb-2" />}
      <div className="text-xl font-bold">{post.title ?? <><IconEyeOff className="inline text-red-500" /> Your Private Post</>}</div>
      <div className="line-clamp-3 my-2">{post.text_only_content}</div>
      <div className="text-gray-700 dark:text-gray-300 text-sm flex justify-between">
        <span>
          {displayAuthor &&
            <>by<img
              className="inline lg:h-8 md:h-6 h-4 mx-1 md:mx-2 aspect-square rounded-md align-middle"
              src={getAvatarUrl(createClient(), {
                ...post,
                id: post.author_id,
                full_name: post.author_name,
                username: post.username,
                updated_at: ''
              })} />
              {post.author_name} on {' '}
            </>
          }
          {format(parseISO(post.created_at), 'LLLL d, yyyy')}
        </span>
        <span className="[&>*]:h-4 [&>svg]:mr-1 [&>:not(svg)]:ml-1 flex items-center">
          {post.likes}<IconThumbUp />
          {post.dislikes}<IconThumbDown />
          {post.num_comments}<IconMessage className="!mr-0" />
        </span>
      </div>
    </Link>
  )

}