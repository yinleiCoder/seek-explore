'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

// 顶部进度条
export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <motion.div
      className="w-screen h-[2px] bg-indigo-500 rounded fixed top-0 left-0 right-0 z-50 shadow-lg shadow-indigo-500"
      style={{ scaleX }}
    />
  )
}
