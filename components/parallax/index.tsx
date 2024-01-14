'use client'

import Image from 'next/image'
import { motion, useTransform, useScroll, MotionValue } from 'framer-motion'
import { useRef } from 'react'
import useDimension from '@/hooks/useDimension'
import clsx from 'clsx'

const sourceImages = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
]

function ParallaxGallery() {
  const parallaxContainer = useRef<HTMLDivElement>(null)
  const { height } = useDimension()
  const { scrollYProgress } = useScroll({
    target: parallaxContainer,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  return (
    <div
      ref={parallaxContainer}
      className="w-full h-[175vh] bg-zinc-900 dark:bg-zinc-800 flex gap-[2vw] p-[2vw] box-border overflow-hidden z-40"
    >
      <Column
        images={[sourceImages[0], sourceImages[1], sourceImages[2]]}
        y={y}
        classNames="top-[-45%]"
      />
      <Column
        images={[sourceImages[3], sourceImages[4], sourceImages[5]]}
        y={y2}
        classNames="top-[-95%]"
      />
      <Column
        images={[sourceImages[6], sourceImages[7], sourceImages[11]]}
        y={y3}
        classNames="top-[-45%]"
      />
      <Column
        images={[sourceImages[9], sourceImages[10], sourceImages[8]]}
        y={y4}
        classNames="top-[-75%]"
      />
    </div>
  )
}

const Column = ({
  images,
  y,
  classNames,
}: {
  images: string[]
  y: MotionValue
  classNames: string
}) => {
  return (
    <motion.div
      style={{ y }}
      className={clsx('w-[25%] h-full flex flex-col gap-[2vw] min-w-[250px] relative', classNames)}
    >
      {images.map((src, index) => {
        return (
          <div key={index} className="w-full h-full relative rounded-lg overflow-hidden">
            <Image src={`/images/parallax/${src}`} alt="yinlei" fill className="object-cover" />
          </div>
        )
      })}
    </motion.div>
  )
}

export default ParallaxGallery
