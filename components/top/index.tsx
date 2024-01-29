'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useScroll } from 'ahooks'
import { usePathname } from 'next/navigation'
import { IoIosArrowUp } from 'react-icons/io'
import clsx from 'clsx'
// 返回顶部
export default function BackTop() {
  const scrollPos = useScroll(typeof window !== 'undefined' ? document : null)
  const pathname = usePathname()
  const relativePathname = pathname.slice(1)
  const blackPathnames = ['watch', 'news', 'me']
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    // 路径黑名单
    if (blackPathnames.includes(relativePathname)) {
      return
    }
    if (scrollPos && scrollPos.top > 0) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }, [scrollPos, pathname])

  function handleBackToTop() {
    if (typeof window === 'undefined') {
      return
    }
    window.scrollTo({
      top: 0,
    })
  }

  return (
    <div
      className={clsx('fixed right-4 bottom-4 z-50', {
        hidden: !isShow,
        block: isShow,
      })}
    >
      <motion.div
        className="bg-indigo-500 hover:bg-indigo-400 rounded-full overflow-hidden font-bold text-white text-2xl p-3 cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleBackToTop}
      >
        <IoIosArrowUp />
      </motion.div>
    </div>
  )
}
