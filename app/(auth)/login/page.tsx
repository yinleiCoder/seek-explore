'use client'

import Button from '@/components/button'
import { handleGithubLogin, login } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { FaGithub } from 'react-icons/fa'
import { CgGirl } from 'react-icons/cg'

function LoginPage() {
  const [state, formAction] = useFormState(login, undefined)
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/')
  }, [state?.success, router])

  return (
    <div className="flex-1 flex gap-3">
      <div className="hidden md:block flex-1 relative">
        <Image
          src={'https://images.pexels.com/photos/19745465/pexels-photo-19745465.jpeg'}
          alt="pexels.com"
          fill
          className="bg-cover"
        />
      </div>
      <div className="flex-[2] flex justify-center items-center">
        <div className="flex flex-col gap-3 bg-white/90 dark:bg-zinc-900 duration-300 items-center w-3/4 md:w-2/4">
          <span className="text-3xl mb-3 hover:text-indigo-500">
            <CgGirl />
          </span>
          <form action={handleGithubLogin} className="w-full">
            <Button
              icon={FaGithub}
              className="bg-zinc-900 w-full text-white px-4 py-2 rounded-md dark:bg-indigo-500 shadow-md hover:bg-zinc-700 dark:hover:bg-indigo-400 flex justify-center items-center gap-2"
            >
              使用Github帐户登录
            </Button>
          </form>
          <p className="text-sm text-gray-400">或者使用您的用户名密码登录</p>
          <form action={formAction} className="flex flex-col items-center gap-2 w-full">
            <input
              type="text"
              name="username"
              placeholder="用户名"
              className="w-full bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-md border-none outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="密码"
              className="w-full bg-zinc-200 dark:bg-zinc-800 px-3 py-2 rounded-md border-none outline-none"
            />
            <span className="text-red-900 text-sm">{state?.error}</span>
            <Button className="bg-indigo-500 w-full shadow-md flex justify-center px-4 py-2 text-white font-bold hover:bg-indigo-400">
              登录
            </Button>
            <Link href={'/register'} className="text-end self-end text-gray-500 text-sm group">
              发现不一样的世界,
              <span className="font-bold underline group-hover:text-indigo-500">注册</span>
              即刻启程
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
