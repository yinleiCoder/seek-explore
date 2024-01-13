'use client'

import Button from '@/components/button'
import { handleLogout } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import { CgBoy } from 'react-icons/cg'
import { AiOutlineLogout } from 'react-icons/ai'
import { Session } from 'next-auth'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/useCurrentUser'

function AuthEntry({ session }: { session: Session | null }) {
  const router = useRouter()
  const user = useCurrentUser()
  return (
    <>
      {session ? (
        <>
          <motion.div
            className="w-[40px] h-[40px] bg-indigo-500 rounded-full relative overflow-hidden cursor-pointer shadow-md"
            whileHover={{ scale: [null, 1.5, 1.4] }}
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
          <a href="https://yinlei.sanity.studio/" target="_blank">
            <Button className="bg-zinc-900 text-white px-1 py-[1px] rounded-md cursor-pointer dark:bg-indigo-500">
              CMS
            </Button>
          </a>
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
          className="hover:bg-zinc-200 text-xl p-2 rounded-md"
        />
      )}
    </>
  )
}

export default AuthEntry
