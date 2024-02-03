'use client'

import { FormEvent } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import type { User } from '@/types/user'
import { GoComment } from 'react-icons/go'
import { CiLock } from 'react-icons/ci'
import { handleGithubLogin } from '@/lib/actions'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Button from '../button'
import Emoji from '../emoji'

type CommentFormProps = {
  text: string
  setText: Function
  placeholder?: string
  onSubmit: (user: User) => Promise<void>
}

export default function CommentForm({
  text,
  setText,
  onSubmit,
  placeholder = '友善评论，共同进步，谢谢支持😄',
}: CommentFormProps) {
  const user = useCurrentUser()

  async function handleAddComment(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    if (text.length === 0) {
      toast('亲，评论内容不能为空哦~', {
        icon: '😚',
      })
      return
    }
    onSubmit(user)
  }

  if (!user) {
    return (
      <div className="flex justify-between">
        <span className="hidden md:block text-gray-400 text-sm">评论系统由UpStash&Redis驱动</span>
        <form
          onSubmit={async e => {
            e.stopPropagation()
            await handleGithubLogin()
          }}
        >
          <Button
            className="bg-red-700 text-white px-4 py-1 duration-300 hover:bg-red-600 text-sm"
            icon={CiLock}
            onClick={e => {
              e.currentTarget.form?.requestSubmit()
              e.preventDefault()
            }}
          >
            Github登录参与讨论
          </Button>
        </form>
      </div>
    )
  }

  return (
    <form onSubmit={handleAddComment}>
      <TextareaAutosize
        maxRows={3}
        minRows={1}
        placeholder={placeholder}
        value={text}
        onChange={e => {
          setText(e.target.value)
        }}
        disabled={!user}
        className={clsx('w-full bg-zinc-100 outline-none px-4 py-3 rounded-lg dark:bg-zinc-800', {
          'cursor-not-allowed': !user,
        })}
      />
      <div className="flex justify-between items-start my-2">
        <Emoji onSelect={(emoji: string) => setText(`${text}${emoji}`)} />
        <Button
          className="bg-primary text-white px-4 py-1 duration-300 hover:bg-primary/80"
          icon={GoComment}
          type="submit"
        >
          评论
        </Button>
      </div>
    </form>
  )
}
