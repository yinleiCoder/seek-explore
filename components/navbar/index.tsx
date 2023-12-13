'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CgBoy } from 'react-icons/cg'
import { AiOutlineLogout } from 'react-icons/ai'
import Theme from '../theme'
import Button from '../button'
import { useAppContext } from '@/context/appContext'
import Image from 'next/image'
import logo from '../../public/images/logo.png'

const links = [
  {
    name: '首页',
    href: '/',
    className: '',
  },
  {
    name: '项目合作',
    href: '/projects',
    className: 'hidden md:block',
  },
  {
    name: '开源软件',
    href: '/openSource',
    className: 'hidden md:block',
  },
  {
    name: '留言墙',
    href: '/wall',
    className: '',
  },
  {
    name: '了解我',
    href: '/me',
    className: '',
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
    <header className="w-full h-[40px] flex items-center justify-between bg-transparent backdrop-blur dark:text-white duration-300 shadow px-2 md:px-5 gap-2 md:gap-3 lg:gap-4 xl:gap-5 box-border">
      <div className="flex items-center gap-1">
        <Image src={logo} width={25} height={25} priority alt="寻寻觅觅" />
        <span className="text-xl font-bold">寻寻觅觅</span>
      </div>
      <div className="flex-1 flex justify-end items-center gap-2 md:gap-3 lg:gap-4 xl:gap-5">
        {links.map(link => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(link.className, {
                'font-bold': pathname === link.href,
              })}
            >
              {link.name}
            </Link>
          )
        })}
        <Theme />
        {user ? (
          <>
            <section className="flex gap-1 items-center bg-indigo-500 text-white px-1 py-1 rounded-md shadow-lg cursor-pointer">
              <div>{user.displayName}</div>
              <img
                src={user.photoURL!}
                alt={user.displayName!}
                className={'rounded-full w-[25px] h-[25px]'}
              />
            </section>
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
