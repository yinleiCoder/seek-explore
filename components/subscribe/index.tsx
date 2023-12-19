'use client'

import { CiLocationArrow1 } from 'react-icons/ci'
import { CgGirl } from 'react-icons/cg'
import Button from '../button'
import { useAppContext } from '@/context/appContext'
import { useEffect, useState } from 'react'
import { User } from 'firebase/auth'

// 订阅更新通过email
export default function Subscribe() {
  const {
    state: { user },
  } = useAppContext()
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (user) {
      setEmail(user.email!)
    }
  }, [user])

  return (
    <div className="mx-auto max-w-2xl my-5 flex flex-col gap-4 border rounded-xl px-2 md:px-6 py-3 md:py-5">
      <div className="font-bold text-xl flex items-center gap-1">
        <CiLocationArrow1 />
        <h1 className="text-base animate-pulse">动态更新</h1>
      </div>
      <p className="flex items-center gap-1 text-sm flex-wrap">
        亲爱的<span className="font-bold text-indigo-500 mx-1">{user?.displayName ?? '朋友'},</span>
        如果喜欢我的文章，不妨订阅支持一下 <CgGirl />
      </p>
      <p className="text-sm text-gray-500">
        每月一封，随时可以取消订阅(邮件订阅功能由React.Email & Resend驱动)
      </p>
      <div className="flex gap-2 items-center">
        <input
          type="email"
          className="flex-1 px-3 py-2 rounded-md outline-none bg-zinc-100 dark:bg-zinc-800"
          placeholder="Your email..."
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <Button className="bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-400 duration-300 rounded-md hover:shadow-md">
          订阅
        </Button>
      </div>
    </div>
  )
}
