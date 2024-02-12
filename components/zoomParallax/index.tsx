'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import Wall1 from '../../public/images/wall/wall1.webp'
import Wall2 from '../../public/images/wall/wall2.webp'
import Wall3 from '../../public/images/wall/wall3.webp'
import Wall4 from '../../public/images/wall/wall4.webp'
import Wall5 from '../../public/images/wall/wall5.webp'
import Wall6 from '../../public/images/wall/wall6.png'
import Wall7 from '../../public/images/wall/wall7.webp'

/**
 * 不动画img的父元素，而是动画img的父元素的父元素，这样就可以解决img scale时布局变形的问题
 */
function ZoomParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7])

  const pictures = [
    {
      src: Wall7,
      scale: scale4,
      imageContainerStyle: {},
    },
    {
      src: Wall6,
      scale: scale5,
      imageContainerStyle: {
        top: '-30vh',
        left: '5vw',
        width: '35vw',
        height: '30vh',
      },
    },
    {
      src: Wall3,
      scale: scale6,
      imageContainerStyle: {
        top: '-10vh',
        left: '-24vw',
        width: '20vw',
        height: '45vh',
      },
    },
    {
      src: Wall4,
      scale: scale7,
      imageContainerStyle: {
        top: '',
        left: '27.5vw',
        width: '25vw',
        height: '25vh',
      },
    },
    {
      src: Wall5,
      scale: scale5,
      imageContainerStyle: {
        top: '29vh',
        left: '5vw',
        width: '20vw',
        height: '28vh',
      },
    },
    {
      src: Wall2,
      scale: scale5,
      imageContainerStyle: {
        top: '27.5vh',
        left: '-22.5vw',
        width: '30vw',
        height: '25vh',
      },
    },
    {
      src: Wall1,
      scale: scale5,
      imageContainerStyle: {
        top: '32vh',
        left: '27vw',
        width: '20vw',
        height: '30vh',
      },
    },
  ]

  return (
    <div className="h-[300vh] relative" ref={containerRef}>
      <div className="sticky top-0 h-[100vh] bg-white dark:bg-zinc-900 overflow-hidden">
        {pictures.map(({ scale, src, imageContainerStyle }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="w-full h-full absolute top-0 flex justify-center items-center"
            >
              <div style={{ ...imageContainerStyle }} className="w-[25vw] h-[25vh] relative">
                <Image
                  src={src}
                  fill
                  alt="girl"
                  placeholder="blur"
                  className="object-cover rounded-md"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ZoomParallax
