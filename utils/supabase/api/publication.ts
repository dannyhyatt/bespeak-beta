import { SupabaseClient } from "@supabase/supabase-js"

interface Publication {
  id: string
  name: string
  url_slug: string
  description: string
  ownerId: string
  // createdAt: string
}

export async function createPublication(supabase: SupabaseClient, name: string, url_slug: string, description: string): Promise<Publication> {

  const { data, error } = await supabase
    .from('publications')
    .insert({ name: name, url_slug, description: description })
    .select()
  if (error) throw error
  return (data[0]) as Publication

}

export async function getPublication(supabase: SupabaseClient, url_slug: string): Promise<Publication> {
  const { data, error } = await supabase
    .from('publications')
    .select()
    .eq('url_slug', url_slug)
  if (error) throw error
  return data[0] as Publication
}

