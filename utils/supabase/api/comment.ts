import { SupabaseClient } from "@supabase/supabase-js"
import Profile from "./profile"

export interface Comment {
  id: string
  author_id: string
  post_id: string
  reply_to_id: string
  content: string
  created_at: string
  updated_at: string
  likes: number
  dislikes: number
}

export interface CommentWithProfile extends Comment {
  profile: Profile
}

export const createComment = async (
    supabase: SupabaseClient, 
    post_id: string, 
    reply_to_id: string | null,
    content: string
  ) => {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: post_id,
        reply_to: reply_to_id,
        content: content,
      })
      .select()

    console.log(data, error)

    if (error) throw error

    if(!data || data.length === 0) {
      throw new Error('Comment not created')
    }

    const commentWithProfile: CommentWithProfile = {
      ...data[0],
    };

    return commentWithProfile
}

export const getComments = async ( client: SupabaseClient, post_id: string, replies_to: string | null ) => {
  let query = client.from('comments_with_profile').select('*').eq('post_id', post_id)

  if(replies_to) {
    query = query.eq('reply_to', replies_to)
  }

  query = query.order('created_at', { ascending: true })

  const { data, error } = await query

  console.log('received data:', data)

  if(error) {
    throw error
  }

  if(!data || data.length === 0) {
    return []
  }

  return data.map((datum: any) => {
    const commentWithProfile: CommentWithProfile = {
      ...datum,
      profile: {
        id: datum.author_id,
        ...datum
      }
    };

    return commentWithProfile
  })
}