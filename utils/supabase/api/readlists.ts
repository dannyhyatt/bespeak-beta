import { SupabaseClient } from "@supabase/supabase-js";
import { PostWithRevision } from "./post";

export default interface Readlist {
  id: string;
  name: string;
  user_id: string;
  num_items: number;
  updated_at: string;
}

export interface ReadlistWithCheck extends Readlist {
  already_in_list: boolean;
}

export const createReadlist = async (supabase: SupabaseClient, name: string) => {

  // idk why this is necessary
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('readlists')
    .insert({ name: name, user_id: user?.id })
    .select().single()

  console.log(data, error)

  if (error) throw error
  return data as Readlist
}

export const getReadlists = async (supabase: SupabaseClient, userID: string) => {

  const { data, error } = await supabase
    .from('readlists')
    .select('*')
    .eq('user_id', userID)
    .order('updated_at', { ascending: false })
  
  console.log('received data', data, error)

  if (error) throw error
  return data as Readlist[]

}

export const getReadlistById = async (supabase: SupabaseClient, readlistID: string) => {
  
    const { data, error } = await supabase
      .from('readlists')
      .select('*')
      .eq('id', readlistID)
      .single()
    
    if (error) throw error
    return data as Readlist
  
  }

export const getPostsByReadlist = async (supabase: SupabaseClient, readlistID: string) => {
    
    const { data, error } = await supabase
      .from('posts_with_revision_and_readlist_id')
      .select('*')
      .eq('readlist_id', readlistID)
  
    if (error) throw error
    return data as PostWithRevision[]
  
  }

export const getReadlistsWithChecks = async (supabase: SupabaseClient, postID: string) => {

  const { data, error } = await supabase
    .rpc('get_readlists_for_post', { postid: postID })

  console.log('received data', data, error)
  
  if (error) throw error
  return data as ReadlistWithCheck[]

}

export const addToReadlist = async (supabase: SupabaseClient, readlistID: string, postID: string) => {
  
  console.log('adding to readlist', readlistID, postID)

  const { data, error } = await supabase
    .from('readlist_items')
    .insert({ readlist_id: readlistID, post_id: postID })
    .select()

  if (error) throw error
  return data

}