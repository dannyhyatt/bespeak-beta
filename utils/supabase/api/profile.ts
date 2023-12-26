import { SupabaseClient } from "@supabase/supabase-js";

export default interface Profile {
  id: string;
  full_name?: string;
  username?: string;
  website?: string;
  avatar_url?: string;
}

export const getMyProfile = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  console.log('user', userError)

  if(!user) return undefined

  console.log('qqqq', user)
    
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .single()
    

  const profile = data as Profile

  return profile
}