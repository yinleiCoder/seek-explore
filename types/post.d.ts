export interface Post {
  title?: string
  description?: string
  date?: string
  tag?: string
  slug?: string
  content?: string
  [key: string]: string | undefined
}
