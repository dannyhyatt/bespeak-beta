import { SupabaseClient } from "@supabase/supabase-js"

export interface Revision {
  id: string
  post_id: string
  title: string
  content: string
  cover_image: string
  created_at: string
}

export interface Post {
  id: string
  author_id: string
  revision_id: string
  revision?: Revision
  tags: string[]
  created_at: string
}

export interface PostWithRevision {
  id: string
  author_id: string
  revision_id: string
  tags?: string[]
  created_at: string
  title: string
  content: string
  cover_image?: string
  edited_at: string
  author_name: string
  avatar: boolean
  username: string
}

export interface RevisionCardInfo {
  id: string
  title: string
  created_at: string
}

// returns post id of created post
export const createPost = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: (await supabase.auth.getUser()).data.user?.id,
      tags: ['test'],
    })
    .select()

  console.log(data, error)

  if (error) throw error
  return data[0].id as string
}

export const createRevision =  async (supabase: SupabaseClient, postId: string, title: String, content: String) => {
  const { data, error } = await supabase
    .from('post_revisions')
    .insert({ post_id: postId, title: title, content: content })
    .select('*')

  console.log(data, error)

  if (error) throw error
  return data[0] as Revision
}

export const updatePostRevision = async (supabase: SupabaseClient, postId: string, revisionId: string) => {
  console.log('updating post revision', postId, revisionId)
  const { data, error } = await supabase
    .from('posts')
    .update({ revision_id: revisionId })
    .eq('id', postId)

  console.log('yup', data, error)

  
  if (error) throw error
  // return data[0] as Post
}

export const getPostDataForPageById = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from('posts_with_revision')
    .select('*')
    .eq('id', id)
    .limit(1)

  console.log("received:::", data, error)

  if(!data || data.length === 0) throw new Error('No data found')

  const post = data[0] as PostWithRevision

  if (error) throw error

  console.log('returning post data', post)

  return post
}

export const getPostDataWithMostRecentRevision = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from('post_revisions')
    .select('*, posts!post_revisions_post_id_fkey(id, author_id, tags, created_at)')
    .eq('post_id', id)
    .order('created_at', { ascending: false })
    .limit(1)

  console.log("received:::", data, error)

  if(!data || data.length === 0) throw new Error('No data found')

  const post = {
    id: data[0].post_id,
    author_id: data[0].posts.author_id,
    revision_id: data[0].id,
    tags: data[0].posts.tags,
    created_at: data[0].posts.created_at,
    title: data[0].title,
    content: data[0].content,
  } as PostWithRevision

  if (error) throw error

  console.log('returning post data', post)

  return post
}

export const getPostsByAuthorId = async (supabase: SupabaseClient, authorId: string, offset?: number, orderBy?: string) => {
  const { data, error } = await supabase
    .from('posts_with_revision')
    .select('*')
    .eq('author_id', authorId)
    .order(orderBy || 'created_at', { ascending: false })
    .limit(10)
    // .offset(offset || 0)

  if (error) throw error
  
  return data as PostWithRevision[]
}

export const getPostsByAuthorUsername = async (supabase: SupabaseClient, authorUsername: string, offset?: number, orderBy?: string) => {
  const { data, error } = await supabase
    .from('posts_with_revision')
    .select('*')
    .eq('username', authorUsername)
    .order(orderBy || 'created_at', { ascending: false })
    .limit(10)
    // .offset(offset || 0)

  if (error) throw error
  
  return data as PostWithRevision[]
}


export const getRevision = async (supabase: SupabaseClient, revisionId: string) => {
  const { data, error } = await supabase
    .from('post_revisions')
    .select('*')
    .eq('id', revisionId)
    .limit(1)

  if (error) throw error

  return data[0] as Revision
}

export const getRevisionsByPostId = async (supabase: SupabaseClient, postId: string) => {
  const { data, error } = await supabase
    .from('post_revisions')
    .select('title, created_at, id')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data as RevisionCardInfo[]
}