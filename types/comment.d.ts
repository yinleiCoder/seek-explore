import { User } from 'firebase/auth'

export type Comment = {
  id: string
  created_at: number
  url: string
  text: string
  user: User
}
