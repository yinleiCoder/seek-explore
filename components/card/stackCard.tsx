'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { randomColor } from '@/utils/color'

function StackCard({
  index,
  range,
  targetScale,
  progress,
}: {
  index: number
  range: number[]
  targetScale: number
  progress: MotionValue<number>
}) {
  const cardContainer = useRef<HTMLDivElement>(null)
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={cardContainer}
      className="w-full h-screen flex items-center justify-center sticky top-0 text-black dark:text-black"
    >
      <motion.div
        className="w-full aspect-video relative rounded-xl md:rounded-3xl p-3 md:p-5 overflow-hidden flex flex-col gap-2 md:gap-3"
        style={{ backgroundColor: randomColor(), scale, top: `calc(-5% + ${index * 25}px)` }}
      ></motion.div>
    </div>
  )
}

export default StackCard
