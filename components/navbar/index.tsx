'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CgBoy } from 'react-icons/cg'
import { AiOutlineLogout } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Theme from '../theme'
import Button from '../button'
import { useAppContext } from '@/context/appContext'
import logo from '../../public/images/yinlei.png'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tooltip } from '@/components/tooltip'
import { useTheme } from 'next-themes'
import { THEME_DARK, THEME_LIGHT } from '@/constants/theme'

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
    name: '一起看片',
    href: '/watch',
    className: 'hidden md:inline-block',
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
  const theme = useTheme()
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
    <header className="w-full h-16 grid grid-cols-12 place-items-center bg-transparent backdrop-blur dark:text-white duration-300 box-border z-40 px-2 py-2 md:px-5">
      <div className="col-start-1 col-span-1 md:col-span-2 flex items-center gap-1 justify-self-start">
        <Image src={logo} alt="寻寻觅觅" width={30} height={30} priority />
      </div>
      <nav className="col-start-2 md:col-start-3 col-span-8 flex flex-nowrap gap-2 md:gap-5 md:px-5 py-2 relative text-sm md:text-base">
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
                  className="underline w-1 h-1 relative left-[50%] -translate-x-[50%] rounded-full bg-indigo-500"
                  layoutId="underline"
                />
              )}
            </Link>
          )
        })}
      </nav>
      <div className="col-start-10 col-span-3 md:col-start-11 md:col-span-2 justify-self-end flex gap-2 md:gap-5 items-center">
        <div
          id="theme-toggle"
          className="flex items-center justify-center p-2 rounded-full border dark:border-gray-500 box-border hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-300"
        >
          <Theme />
        </div>
        <Tooltip
          anchorSelect="#theme-toggle"
          content={theme.theme}
          variant={theme.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK}
        />
        {user ? (
          <>
            <div className="relative">
              <div className="absolute -right-1 -bottom-1 rotate-12 z-40">
                <FcGoogle />
              </div>
              <img
                src={user.photoURL!}
                alt={user.displayName!}
                className={'rounded-full w-[35px] h-[35px] cursor-pointer border-black border-2'}
              />
            </div>
            <Button icon={AiOutlineLogout} onClick={handleLogoutByOAuth}>
              退出登录
            </Button>
          </>
        ) : (
          <Button icon={CgBoy} onClick={handleLoginByOAuth} />
        )}
      </div>
    </header>
  )
}
