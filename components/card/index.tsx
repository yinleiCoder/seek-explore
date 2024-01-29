'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useScroll, motion, useTransform } from 'framer-motion'
import { dateFormat } from '@/utils/date'
import type { Post } from '@/types/post'

export default function Card({ title, description, date, slug }: Post) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', '1.1 1'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1])

  return (
    <Link href={`/posts/${slug}`}>
      <motion.div
        ref={cardRef}
        style={{
          scale,
          opacity,
        }}
        className="flex flex-col gap-2 md:gap-3 bg-gray-200 dark:bg-zinc-800 dark:text-white rounded-md p-2 md:p-3 lg:p-5 hover:bg-indigo-500 dark:hover:bg-indigo-500 duration-300 hover:text-white group text-sm md:text-base"
      >
        <h1 className="md:text-lg font-bold">{title}</h1>
        <span className="text-gray-500 group-hover:text-white duration-300">
          {dateFormat(date ?? new Date())}
        </span>
        <p>{description}</p>
      </motion.div>
    </Link>
  )
}
