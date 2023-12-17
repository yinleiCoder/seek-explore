import { Comment } from '@/types/comment'
import { User } from '@/types/user'
import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

/**
 * swr: https://swr.vercel.app/docs/advanced/understanding
 */
export default function useComments(token = '') {
  const [text, setText] = useState('')

  // get comment
  const { data: comments, mutate } = useSWR<Comment[]>('/api/comment', fetcher, {
    fallbackData: [],
  })

  // add comment
  const onSubmit = async (e: React.FormEvent, user: User) => {
    e.preventDefault()
    try {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ text, user }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      setText('')
      await mutate()
    } catch (err) {
      console.error(err)
    }
  }

  // delete comment
  const onDelete = async (comment: Comment) => {
    try {
      await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({ comment }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      })
      await mutate()
    } catch (err) {
      console.error(err)
    }
  }

  return { text, setText, comments, onSubmit, onDelete }
}
