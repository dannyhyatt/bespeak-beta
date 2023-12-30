export default interface Post {
  id: string
  title: string
  author: string
  tags: string[]
}

export default interface Revision {
  id: string
  post_id: string
  title: string
  content: string
}