'use client'

import useComments from '@/hooks/useComment'
import CommentForm from './form'

export default function Comment() {
  const { text, setText, comments, onSubmit, onDelete } = useComments()
  return (
    <div className="max-w-3xl mx-auto">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
      {/* <CommentList comments={comments} onDelete={onDelete} /> */}
    </div>
  )
}
