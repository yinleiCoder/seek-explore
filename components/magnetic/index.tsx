'use client'

import { MouseEventHandler, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// 磁吸组件
export default function Magnetic({ children }: { children: React.ReactNode }) {
  const magneticRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const manageMouseMove: MouseEventHandler<HTMLDivElement> = e => {
    const { clientX, clientY } = e
    if (!magneticRef.current) return
    const { width, height, left, top } = magneticRef.current.getBoundingClientRect()
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    setPosition({ x, y })
  }

  const manageMouseLeave: MouseEventHandler<HTMLDivElement> = e => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.div
      onMouseMove={manageMouseMove}
      onMouseLeave={manageMouseLeave}
      ref={magneticRef}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
