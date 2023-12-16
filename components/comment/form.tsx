'use client'

import { useAppContext } from '@/context/appContext'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '../button'
import { GoComment } from 'react-icons/go'
import { CiLock } from 'react-icons/ci'
import clsx from 'clsx'

type CommentFormProps = {
  text: string
  setText: Function
  onSubmit: (e: React.FormEvent) => Promise<void>
}

export default function CommentForm({ text, setText, onSubmit }: CommentFormProps) {
  const {
    state: { user },
  } = useAppContext()
  return (
    <form onSubmit={onSubmit}>
      <TextareaAutosize
        maxRows={3}
        minRows={1}
        placeholder="友善评论，共同进步，谢谢支持😄"
        value={text}
        onChange={e => {
          setText(e.target.value)
        }}
        disabled={!user}
        className={clsx('w-full bg-zinc-100 outline-none px-4 py-3 rounded-lg', {
          'cursor-not-allowed': !user,
        })}
      />
      <div className="flex justify-between items-start my-2">
        <span className="text-gray-300 text-sm">评论系统由UpStash强力驱动</span>
        {user ? (
          <Button
            className="bg-indigo-500 text-white px-4 py-1 duration-300 hover:bg-indigo-400"
            icon={GoComment}
          >
            评论
          </Button>
        ) : (
          <Button
            className="bg-red-700 text-white px-4 py-1 duration-300 hover:bg-red-600"
            icon={CiLock}
          >
            登录后参与讨论
          </Button>
        )}
      </div>
    </form>
  )
}
