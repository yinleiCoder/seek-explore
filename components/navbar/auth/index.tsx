'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import type { Session } from 'next-auth'
import { CgBoy } from 'react-icons/cg'
import { AiOutlineLogout } from 'react-icons/ai'
import { handleLogout } from '@/lib/actions'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import Button from '@/components/button'

function AuthEntry({ session }: { session: Session | null }) {
  const router = useRouter()
  const user = useCurrentUser()
  return (
    <>
      {session ? (
        <>
          <motion.div
            className="w-[30px] h-[30px] bg-indigo-500 rounded-full relative overflow-hidden cursor-pointer shadow-md"
            whileHover={{ scale: [null, 1.2, 1.1] }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={user?.image ?? '/images/userAvatar.png'}
              fill
              className="object-cover"
              alt={user?.name ?? ''}
            />
          </motion.div>
          <form action={handleLogout}>
            <Button icon={AiOutlineLogout}>退出登录</Button>
          </form>
        </>
      ) : (
        <Button
          icon={CgBoy}
          onClick={() => {
            router.push('/login')
          }}
          className="hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xl p-2 rounded-md"
        />
      )}
    </>
  )
}

export default AuthEntry
