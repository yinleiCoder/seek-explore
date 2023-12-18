'use client'

import useComments from '@/hooks/useComment'
import CommentForm from './form'
import { useAppContext } from '@/context/appContext'
import CommentList from './list'

export default function Comment() {
  const {
    state: { idToken },
  } = useAppContext()
  const { text, setText, comments, onSubmit, onDelete } = useComments(idToken ?? '')
  return (
    <div className="w-full">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
      <CommentList comments={comments} onDelete={onDelete} />
    </div>
  )
}
