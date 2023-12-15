'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CgBoy } from 'react-icons/cg'
import { AiOutlineLogout } from 'react-icons/ai'
import Theme from '../theme'
import Button from '../button'
import { useAppContext } from '@/context/appContext'
import logo from '../../public/images/yinlei.png'
import Image from 'next/image'
import { motion } from 'framer-motion'

const links = [
  {
    name: '随笔',
    href: '/',
    className: '',
  },
  {
    name: '时讯',
    href: '/news',
    className: '',
  },
  {
    name: '照片',
    href: '/photos',
    className: '',
  },
  {
    name: '开源软件',
    href: '/openSource',
    className: 'hidden md:inline-block',
  },
  {
    name: '留言墙',
    href: '/wall',
    className: '',
  },
  {
    name: '了解我',
    href: '/me',
    className: 'hidden md:inline-block',
  },
]

// 导航栏
export default function Navbar() {
  const pathname = usePathname()
  const {
    state: { user },
    googleSignIn,
    googleSignOut,
  } = useAppContext()

  const handleLoginByOAuth = async () => {
    await googleSignIn()
  }

  const handleLogoutByOAuth = async () => {
    await googleSignOut()
  }

  return (
    <header className="w-full h-[50px] grid grid-cols-12 place-items-center bg-transparent backdrop-blur dark:text-white duration-300 box-border z-40 px-2 py-2 md:px-5">
      <div className="col-start-1 col-span-2 flex items-center gap-1 justify-self-start">
        <Image src={logo} alt="寻寻觅觅" width={30} height={30} priority />
        <span className="hidden md:inline-block text-lg font-bold">寻寻觅觅</span>
      </div>
      <nav className="col-start-3 col-span-8 flex gap-2 md:gap-5 border rounded-2xl px-4 md:px-5 py-1 shadow-md dark:shadow-indigo-500 relative">
        {links.map(link => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(link.className, {
                'text-indigo-500': pathname === link.href,
              })}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  className="underline w-full h-[2px] bg-indigo-500 rounded-md"
                  layoutId="underline"
                />
              )}
            </Link>
          )
        })}
      </nav>
      <div className="col-start-11 col-span-2 justify-self-end flex gap-2 md:gap-5">
        <Theme />
        {user ? (
          <>
            <div className="">
              <img
                src={user.photoURL!}
                alt={user.displayName!}
                className={'rounded-full w-[30px] h-[30px] cursor-pointer'}
              />
            </div>
            {/* <Button icon={AiOutlineLogout} onClick={handleLogoutByOAuth}>
              退出登录
            </Button> */}
          </>
        ) : (
          <Button icon={CgBoy} onClick={handleLoginByOAuth} />
        )}
      </div>
    </header>
  )
}
