import Theme from '../theme'
import AuthEntry from './auth'
import { auth } from '@/lib/auth'
import NavLinks from './links'
import ThemeWrapper from './themewrapper'
import Kdb from '../kdb'

export const links: LinkProp[] = [
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
    name: '睹物思人',
    href: '/photos',
    className: '',
  },
  {
    name: '视频科普',
    href: '/watch',
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
export default async function Navbar() {
  const session = await auth()

  return (
    <header className="w-full h-16 grid grid-cols-12 place-items-center bg-transparent backdrop-blur dark:text-white duration-300 box-border z-40 px-2 py-2 md:px-5">
      <nav className="col-start-1 col-end-9 flex flex-nowrap gap-2 md:gap-5 md:px-5 py-2 relative text-sm md:text-base justify-self-start">
        <NavLinks links={links} />
      </nav>
      <div className="col-start-9 col-end-13 justify-self-end flex gap-2 md:gap-5 items-center">
        <div className="hidden md:flex md:gap-1 md:items-center">
          <Kdb className="py-[2px] border dark:border-none shadow-md">Ctrl</Kdb>
          <Kdb className="py-[2px] border dark:border-none shadow-md">Q</Kdb>
        </div>
        <div
          id="theme-toggle"
          className="flex items-center justify-center p-2 rounded-full border dark:border-gray-500 box-border hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-300"
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
