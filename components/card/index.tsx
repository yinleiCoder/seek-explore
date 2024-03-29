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
        className="flex flex-col gap-2 md:gap-3 border dark:border-gray-600 dark:bg-zinc-800 dark:text-white rounded-md md:rounded-lg lg:rounded-xl xl:rounded-2xl p-2 md:p-3 lg:p-5 bg-zinc-100/50 hover:bg-primary dark:hover:bg-primary dark:hover:text-zinc-900 duration-300 group text-sm md:text-base"
      >
        <h1 className="md:text-lg font-bold hover:underline">{title}</h1>
        <span className="text-gray-500 duration-300">{dateFormat(date ?? new Date())}</span>
        <p>{description}</p>
      </motion.div>
    </Link>
  )
}
