import { SupabaseClient } from "@supabase/supabase-js";

export default interface Profile {
  id: string;
  full_name: string;
  username: string;
  bio?: string;
  website?: string;
  avatar_url?: string;
  updated_at: string;
}

export const setProfile = async (supabase: SupabaseClient, profile: Profile) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select('*')

  if (error) throw error
  return data[0] as Profile
}

export const getMyProfile = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if(!user) return undefined
    
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .single()
    

  const profile = data as Profile

  return profile
}