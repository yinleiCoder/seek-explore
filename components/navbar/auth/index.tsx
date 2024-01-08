'use client'

import Button from '@/components/button'
import { handleLogout } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { CgBoy } from 'react-icons/cg'
import { AiOutlineLogout } from 'react-icons/ai'
import { Session } from 'next-auth'

function AuthEntry({ session }: { session: Session | null }) {
  const router = useRouter()
  return (
    <>
      {session ? (
        <form action={handleLogout}>
          <Button icon={AiOutlineLogout}>退出登录</Button>
        </form>
      ) : (
        <Button
          icon={CgBoy}
          onClick={() => {
            router.push('/login')
          }}
          className="hover:bg-zinc-200 text-xl p-2 rounded-md"
        />
      )}
    </>
  )
}

export default AuthEntry
