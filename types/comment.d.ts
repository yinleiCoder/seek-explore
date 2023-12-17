import { User } from './user'

export type Comment = {
  id: string
  post_slug: string
  text: string
  user: User
  created_at: number
}
