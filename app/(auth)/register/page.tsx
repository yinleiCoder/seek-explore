'use client'

import Button from '@/components/button'
import { register } from '@/lib/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'

function RegisterPage() {
  const [state, formAction] = useFormState(register, undefined)
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/login')
  }, [state?.success, router])

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="username" placeholder="用户名" />
        <input type="email" name="email" placeholder="邮箱" />
        <input type="password" name="password" placeholder="密码" />
        <input type="password" name="passwordRepeat" placeholder="确认密码" />
        {state?.error}
        <Button>注册</Button>
        <Link href={'/login'}>已有账户？登录</Link>
      </form>
    </div>
  )
}

export default RegisterPage
