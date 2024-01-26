import { SupabaseClient } from "@supabase/supabase-js";

export default interface Profile {
  id: string;
  full_name: string;
  username: string;
  bio?: string;
  website?: string;
  avatar: boolean;
  updated_at: string;
}

interface CreateProfileParams {
  id: string;
  full_name: string;
  username: string;
  bio?: string;
  website?: string;
  avatar_url?: string;
}

export const setProfile = async (supabase: SupabaseClient, profile: CreateProfileParams) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select('*')

  if (error) throw error
  return data[0] as Profile
}

export const getProfileById = async (supabase: SupabaseClient, id: string) => {
    
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', id)
    .single()
    

  const profile = data as Profile

  return profile
}

export const getProfileByUsername = async (supabase: SupabaseClient, username: string) => {
    
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('username', username)
    .single()
    

  const profile = data as Profile

  return profile
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

export const getProfilesBySearch = async (supabase: SupabaseClient, search: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .ilike('username', `%${search}%`)
    .limit(10)

  if (error) throw error

  return data as Profile[]
}

export const getAvatarUrl = (supabase: SupabaseClient, profile: Profile) => {
  if (profile.avatar) {
    return supabase.storage.from('avatars').getPublicUrl(`${profile.username}.png`).data.publicUrl
  } else {
    return 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
  }
}