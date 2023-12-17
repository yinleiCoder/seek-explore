'use client'

import { useAppContext } from '@/context/appContext'
import { Comment } from '@/types/comment'
import { dateRelativeTime } from '@/utils/date'
import { CgGirl } from 'react-icons/cg'
import { motion } from 'framer-motion'

type CommentListProps = {
  comments?: Comment[]
  onDelete: (comment: Comment) => Promise<void>
}

export default function CommentList({ comments, onDelete }: CommentListProps) {
  const {
    state: { user },
  } = useAppContext()
  return (
    <div className="space-y-5">
      {comments &&
        comments.map(comment => {
          const isAuthor = user && user.uid === comment.user.uid
          return (
            <div className="flex gap-3 items-start" key={comment.id}>
              <div className="flex-shrink-0">
                <motion.img
                  src={comment.user.photoURL ?? ''}
                  className="w-10 aspect-square rounded-full"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  alt={comment.user.displayName}
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <div className="flex items-center gap-1">
                  <span className="font-bold">{comment.user.displayName}</span>
                  {isAuthor && (
                    <span className="text-xs bg-indigo-500 text-white rounded px-2 py-1">我</span>
                  )}
                  <span className="text-sm text-gray-500">
                    {dateRelativeTime(comment.created_at)}
                  </span>
                </div>
                <div className="break-all whitespace-normal">{comment.text}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
