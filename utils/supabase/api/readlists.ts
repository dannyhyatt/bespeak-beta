import { SupabaseClient } from "@supabase/supabase-js";

export default interface Readlist {
  id: string;
  name: string;
  user_id: string;
  num_items: number;
  updated_at: string;
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

  if (error) throw error
  return data as Readlist[]

}