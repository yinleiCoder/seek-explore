'use client'

import Button from '@/components/button'
import { register } from '@/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { CgBoy } from 'react-icons/cg'

function RegisterPage() {
  const [state, formAction] = useFormState(register, undefined)
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/login')
  }, [state?.success, router])

  return (
    <div className="flex-1 flex justify-center items-center flex-col relative">
      <Image
        src="/images/login.webp"
        fill
        alt="register background"
        className="object-cover z-[-10]"
      />
      <div className="w-[85vw] md:w-[30vw] shadow-md rounded-md overflow-hidden px-6 py-8 bg-zinc-100/50 dark:bg-zinc-800/50">
        <span className="text-3xl flex justify-center mb-3 hover:text-indigo-500">
          <CgBoy />
        </span>
        <form action={formAction} className="flex flex-col gap-2 w-full">
          <input
            type="text"
            name="username"
            placeholder="用户名"
            className="w-full bg-zinc-200 px-3 py-2 rounded-md outline-none border-none dark:bg-zinc-800"
          />
          <input
            type="email"
            name="email"
            placeholder="邮箱"
            className="w-full bg-zinc-200 px-3 py-2 rounded-md outline-none border-none dark:bg-zinc-800"
          />
          <input
            type="password"
            name="password"
            placeholder="密码"
            className="w-full bg-zinc-200 px-3 py-2 rounded-md outline-none border-none dark:bg-zinc-800"
          />
          <input
            type="password"
            name="passwordRepeat"
            placeholder="确认密码"
            className="w-full bg-zinc-200 px-3 py-2 rounded-md outline-none border-none dark:bg-zinc-800"
          />
          <span className="text-sm text-red-900">{state?.error}</span>
          <Button className="w-full bg-indigo-500 px-3 py-2 text-center text-white rounded-md font-bold flex justify-center">
            注册
          </Button>
          <Link href={'/login'} className="text-gray-500 text-sm group">
            <span className="font-bold underline group-hover:text-indigo-500">登录</span>,发现不同
          </Link>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
