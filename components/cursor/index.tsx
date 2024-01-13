'use client'

import useMousePosition from '@/hooks/useMousePosition'
import { motion } from 'framer-motion'
import { useState } from 'react'

function MaskCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const { x, y } = useMousePosition()
  const size = isHovered ? 400 : 40

  return (
    <section className="h-screen relative">
      <motion.div
        className="mask w-full h-full flex justify-center items-center text-[#afa18f] text-4xl font-bold cursor-default absolute bg-red-600"
        style={{
          maskImage: `url('/images/mask.svg')`,
          maskRepeat: 'no-repeat',
          // maskPosition: '50%',
          maskSize: '40px',
          color: 'black',
        }}
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: 'tween', ease: 'backOut' }}
      >
        <p
          className="w-[1000px]"
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
        >
          The more time passes by, the more technology we have. The more A.I develops itself, the
          more value will be put in authentic expressions. We are slowly entering a new era, a
          technology enabled-era where creative expression can be made through technology.
        </p>
      </motion.div>
      <div className="body w-full h-full flex justify-center items-center text-[#afa18f] text-4xl font-bold cursor-default">
        <p className="w-[1000px]">
          A creative developer sits between the <span className="text-red-600">arts</span> and{' '}
          <span className="text-red-600">software</span> engineering. Creative development is a mix
          of art and technology.
        </p>
      </div>
    </section>
  )
}

export default MaskCursor
