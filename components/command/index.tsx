'use client'

import { useKeyPress } from 'ahooks'
import { Command } from 'cmdk'
import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { links } from '../navbar'
import { LiaToolsSolid } from 'react-icons/lia'
import { CgBrowser } from 'react-icons/cg'
import { MdDarkMode } from 'react-icons/md'
import { IoSunnyOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Kdb from '../kdb'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { THEME_DARK, THEME_LIGHT } from '@/constants/theme'

export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  // 监听键盘
  useKeyPress(
    ['ctrl.q'],
    () => {
      setOpen(open => !open)
    },
    {
      exactMatch: true,
    }
  )

  const handleChangeNavigation = (value: string) => {
    const formatedValue = value.substring(0, value.indexOf('('))
    const targetLink = links.find((item, index, items) => {
      return item.name === formatedValue
    })
    if (!targetLink) {
      return
    }
    router.push(targetLink.href)
    setOpen(open => !open)
  }

  // framer motion variants
  const modalListContent = {
    hidden: {
      y: '-100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
        type: 'spring',
      },
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <Command.Dialog
      className="w-[75%] lg:w-[55%] h-1/2 bg-white rounded-xl overflow-hidden fixed top-[65px] left-[50%] translate-x-[-50%] z-[100] flex flex-col shadow-lg border dark:border-black dark:bg-zinc-800"
      open={open}
      onOpenChange={setOpen}
      loop
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full gap-2 items-center p-2 border-b">
          <span className="text-xl">
            <IoIosSearch />
          </span>
          <Command.Input
            value={search}
            onValueChange={setSearch}
            className="flex-1 outline-none border-none p-1 bg-transparent"
            placeholder="开始键入"
          />
        </div>
        <div className="text-xs text-gray-500 my-1 p-2">
          <span className="font-bold">提示</span>: 键入
          <Kdb className="mx-1">?</Kdb>
          查找命令帮助
        </div>
      </div>
      <Command.List className="overflow-y-auto p-2 text-sm flex-1">
        <motion.div variants={modalListContent} initial="hidden" animate="visible" exit="exit">
          {/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}
          <Command.Empty>未找到数据呈现😨请重试</Command.Empty>
          <Command.Group
            heading={
              <div>
                <span className="font-bold text-gray-500">导航</span>
              </div>
            }
          >
            {links.map(link => {
              return (
                <Command.Item
                  className="py-2 rounded-md px-2 dark:hover:bg-zinc-600 flex items-center gap-2 hover:bg-zinc-100 cursor-pointer"
                  key={link.name}
                  onSelect={handleChangeNavigation}
                >
                  <CgBrowser />
                  {link.name}
                  {'('}
                  {link.href}
                  {')'}
                </Command.Item>
              )
            })}
          </Command.Group>
          <Command.Separator className="border my-2" />
          <Command.Group
            heading={
              <div>
                <span className="font-bold text-gray-500">功能</span>
              </div>
            }
          >
            <Command.Item
              className="py-2 rounded-md px-2 dark:hover:bg-zinc-600 flex gap-2 items-center hover:bg-zinc-100 cursor-pointer"
              onSelect={() => setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)}
            >
              {theme === THEME_DARK ? <MdDarkMode /> : <IoSunnyOutline />}
              Current Theme: {theme}
            </Command.Item>
            <Command.Item
              className="py-2 rounded-md px-2 dark:hover:bg-zinc-600 flex gap-2 items-center hover:bg-zinc-100 cursor-pointer"
              onSelect={() => window.open('https://yinlei.sanity.studio/', '_blank')}
            >
              <LiaToolsSolid />
              Sanity CMS（内容管理平台）
            </Command.Item>
          </Command.Group>
        </motion.div>
      </Command.List>
      <div className="w-full border-t p-2 flex justify-between items-center">
        <Image
          src="/images/userAvatar.png"
          width={25}
          height={25}
          alt="logo"
          className="flex-shrink-0"
        />
        <div className="flex items-center text-sm gap-2">
          <div className="flex items-center gap-2">
            <span>选择该项</span>
            <Kdb>↵</Kdb>
          </div>
          <span className="h-3 w-[1px] bg-zinc-800 dark:bg-white" />
          <div className="flex items-center gap-2">
            <span>开启/关闭命令行</span>
            <Kdb>Ctrl</Kdb>
            <Kdb>Q</Kdb>
          </div>
        </div>
      </div>
    </Command.Dialog>
  )
}
