'use client'

import { useAppContext } from '@/context/appContext'
import TextareaAutosize from 'react-textarea-autosize'
import Button from '../button'
import { GoComment } from 'react-icons/go'
import { CiLock } from 'react-icons/ci'
import clsx from 'clsx'
import { FormEvent } from 'react'
import { User } from '@/types/user'
import Emoji from '../emoji'

type CommentFormProps = {
  text: string
  setText: Function
  onSubmit: (e: React.FormEvent, user: User) => Promise<void>
}

export default function CommentForm({ text, setText, onSubmit }: CommentFormProps) {
  const {
    state: { user },
    googleSignIn,
  } = useAppContext()

  function handleAddComment(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    const commentOfUser: User = {
      uid: user.uid,
      displayName: user.displayName ?? '',
      email: user.email ?? '',
      phoneNumber: user.phoneNumber ?? '',
      photoURL: user.photoURL ?? '',
    }
    onSubmit(e, commentOfUser)
  }

  const handleLoginByOAuth = async () => {
    await googleSignIn()
  }

  return (
    <form onSubmit={handleAddComment}>
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
        {user ? (
          <>
            <Emoji onSelect={(emoji: string) => setText(`${text}${emoji}`)} />
            <Button
              className="bg-indigo-500 text-white px-4 py-1 duration-300 hover:bg-indigo-400"
              icon={GoComment}
              type="submit"
            >
              评论
            </Button>
          </>
        ) : (
          <>
            <span className="text-gray-400 text-sm">评论系统由UpStash&Redis驱动</span>
            <Button
              className="bg-red-700 text-white px-4 py-1 duration-300 hover:bg-red-600"
              icon={CiLock}
              onClick={handleLoginByOAuth}
            >
              登录后参与讨论
            </Button>
          </>
        )}
      </div>
    </form>
  )
}
