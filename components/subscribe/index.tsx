'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { CiLocationArrow1 } from 'react-icons/ci'
import { BsSend } from 'react-icons/bs'

// 订阅更新通过email
export default function Subscribe() {
  const user = useCurrentUser()
  const [email, setEmail] = useState<string>('')

  const handleSendEmail = async () => {
    const res = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(email),
    })
    const data = await res.json()
    if (data.error) {
      toast.error(data.error)
    } else {
      toast('订阅成功！将第一时间推送文章更新、时政消息和四川考编动态', {
        icon: '👏',
      })
    }
  }

  useEffect(() => {
    if (user) {
      setEmail(user.email!)
    }
  }, [user])

  return (
    <div className="my-3 flex flex-col gap-4 border rounded-xl px-2 md:px-6 py-3 md:py-5">
      <div className="font-bold text-xl flex items-center gap-1">
        <CiLocationArrow1 />
        <h1 className="text-base animate-pulse text-indigo-500">订阅</h1>
      </div>
      <p className="text-sm">
        <span className="font-bold text-indigo-500">{user?.name ?? '朋友'}</span>
        ,点击订阅将第一时间推送文章更新、时政消息和四川考编动态
      </p>
      <p className="text-xs text-gray-500">邮件由React.Email & Resend驱动</p>
      <div className="w-full flex gap-2 items-center">
        <input
          type="email"
          name="email"
          className="flex-1 px-3 py-2 rounded-md outline-none bg-zinc-100 dark:bg-zinc-800"
          placeholder="Your email..."
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <motion.button
          className="bg-indigo-500 p-2 text-white hover:bg-indigo-400 rounded-full shadow-md"
          disabled={!user}
          onClick={handleSendEmail}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <BsSend />
        </motion.button>
      </div>
    </div>
  )
}
