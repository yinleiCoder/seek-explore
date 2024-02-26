import { auth } from '@/lib/auth'
import Theme from '../theme'
import ThemeWrapper from './themewrapper'
import AuthEntry from './auth'
import NavLinks from './links'
import Kdb from '../kdb'

export const links: NavbarItem[] = [
  {
    name: '随笔',
    href: '/',
    className: '',
  },
  {
    name: '时讯',
    href: '/news',
    className: 'hidden md:inline-block',
  },
  {
    name: '雅俗共赏',
    href: '/photos',
    className: 'hidden md:inline-block',
  },
  {
    name: '教书育人',
    href: '/watch',
    className: '',
  },
  {
    name: '巧夺天工',
    href: '/collections',
    className: '',
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
export default async function Navbar() {
  const session = await auth()

  return (
    <header className="w-full h-14 flex items-center justify-between px-2 md:px-5 xl:px-8">
      <nav className="flex items-center gap-x-2 lg:gap-x-4 xl:gap-x-5">
        <NavLinks links={links} />
      </nav>
      <div className="flex items-center gap-x-2 lg:gap-x-4 xl:gap-x-5">
        <div className="hidden lg:flex items-center gap-x-[1px] select-none">
          <Kdb className="py-[2px] border dark:border-none shadow-md">Ctrl</Kdb>
          <Kdb className="py-[2px] border dark:border-none shadow-md">Q</Kdb>
        </div>
        <div
          id="theme-toggle"
          className="flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xl p-2 rounded-md z-50"
        >
          <ThemeWrapper>
            <Theme />
          </ThemeWrapper>
        </div>
        <AuthEntry session={session} />
      </div>
    </header>
  )
}
