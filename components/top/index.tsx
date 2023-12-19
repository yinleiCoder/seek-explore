'use client'

import { PiArrowUpDuotone } from 'react-icons/pi'
import { motion } from 'framer-motion'
import { useScroll } from 'ahooks'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function BackTop() {
  const scrollPosition = useScroll(typeof window !== 'undefined' ? document : null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (scrollPosition && scrollPosition.top > 0) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [scrollPosition])

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
      className={clsx('fixed right-5 bottom-7 z-50', {
        hidden: !show,
        block: show,
      })}
    >
      <motion.div
        className="bg-indigo-500 hover:bg-indigo-400 rounded-full font-bold text-white text-2xl p-3 cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        onClick={handleBackToTop}
      >
        <PiArrowUpDuotone />
      </motion.div>
    </div>
  )
}
