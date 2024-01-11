'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { News } from '@/types/news'
import { randomColor } from '@/utils/color'

function StackCard({
  id,
  title,
  date,
  category,
  content,
  image,
  source,
  link,
  index,
  range,
  targetScale,
  progress,
}: News & { index: number; range: number[]; targetScale: number; progress: MotionValue<number> }) {
  const cardContainer = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardContainer,
    offset: ['start end', 'start start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={cardContainer}
      className="w-full h-screen flex items-center justify-center sticky top-0 text-black dark:text-black"
    >
      <motion.div
        className="w-full aspect-video relative rounded-xl md:rounded-3xl p-3 md:p-5 overflow-hidden flex flex-col gap-2 md:gap-3"
        style={{ backgroundColor: randomColor(), scale, top: `calc(-5% + ${index * 25}px)` }}
      >
        <section className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
          <div className="flex items-center flex-wrap gap-2 text-sm">
            <span>{date}</span>
            <span className="border border-black rounded-md px-[2px] py-[1px]">{category}</span>
            <span>{source}</span>
          </div>
        </section>
        <section className="flex-1 flex  items-start gap-1 md:gap-2">
          <div className="flex-1 text-sm md:text-base">{content}</div>
          <div className="flex-1 w-full h-full flex items-center justify-center p-2 md:p-3 xl:p-4 relative rounded-xl md:rounded-2xl overflow-hidden">
            <motion.div
              className="relative w-full h-full rounded-xl md:rounded-2xl shadow-md overflow-hidden"
              style={{ scale: imageScale }}
            >
              <Image src={image} alt={title} className="object-cover" fill />
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}

export default StackCard
