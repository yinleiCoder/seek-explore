'use client'

import { Post } from '@/types/post'
import { dateFormat } from '@/utils/date'
import { useScroll, motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { analytics } from '@/lib/firebase'
import { logEvent } from 'firebase/analytics'

export default function Card({ title, description, date, slug }: Post) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', '1.33 1'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1])

  async function handleCardTapCollectEvent() {
    const analy = await analytics
    if (!analy) {
      return
    }
    logEvent(analy, 'browse_post', {
      post_slug: slug,
      post_title: title,
    })
  }

  return (
    <Link href={`/posts/${slug}`}>
      <motion.div
        ref={cardRef}
        style={{
          scale,
          opacity,
        }}
        className="flex flex-col gap-2 md:gap-3 bg-gray-200 dark:bg-zinc-800 dark:text-white rounded-md p-2 md:p-3 lg:p-5 hover:bg-indigo-500 dark:hover:bg-indigo-500 duration-300 hover:text-white group"
        onClick={handleCardTapCollectEvent}
      >
        <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        <span className="text-gray-500 group-hover:text-white duration-300">
          {dateFormat(date ?? new Date())}
        </span>
        <p>{description}</p>
      </motion.div>
    </Link>
  )
}
