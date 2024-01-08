'use client'

import Button from '@/components/button'
import { handleGithubLogin, login } from '@/lib/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'

function LoginPage() {
  const [state, formAction] = useFormState(login, undefined)
  const router = useRouter()

  useEffect(() => {
    state?.success && router.push('/')
  }, [state?.success, router])

  return (
    <div>
      <form action={formAction}>
        <input type="text" name="username" placeholder="用户名" />
        <input type="password" name="password" placeholder="密码" />
        <Button>登录</Button>
        {state?.error}
      </form>
      <Link href={'/register'}>没有账户？去注册</Link>
      <form action={handleGithubLogin}>
        <Button>使用Github</Button>
      </form>
    </div>
  )
}

export default LoginPage
