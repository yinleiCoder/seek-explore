'use client'

import useComments from '@/hooks/useComment'
import CommentForm from './form'
import { useAppContext } from '@/context/appContext'
import CommentList from './list'

export default function Comment({ placeholder }: { placeholder?: string }) {
  const {
    state: { token },
  } = useAppContext()
  const { text, setText, comments, onSubmit, onDelete } = useComments(token ?? '')

  return (
    <div className="w-full flex flex-col gap-2">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} placeholder={placeholder} />
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  )
}
