'use client'

import useMousePosition from '@/hooks/useMousePosition'
import { motion } from 'framer-motion'
import { useState } from 'react'

function MaskCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const { x, y } = useMousePosition()
  const size = isHovered ? 400 : 40

  return (
    <section className="h-[70vh] relative">
      <motion.div
        className="mask w-full h-full flex justify-center items-center text-[#afa18f] text-2xl font-bold cursor-default absolute bg-red-600"
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
          className="w-[1000px] leading-10"
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
        >
          我喜欢这些编程语言和技术栈方向：C、C++、Go、JavaScript、C#、Python、FFmpeg、OpenCV、OpenGL、Android、Docker、逆向分析、数据分析、NLP、计算机视觉。如果你非要说学这些能带给我什么，我只能回答：我很享受通过写代码做出自己想做的软件，类似游戏外挂，既给我成就感，也给我的生活带来了效率。Enjoy
          it!
        </p>
      </motion.div>
      <div className="body w-full h-full flex justify-center items-center text-[#afa18f] text-2xl font-bold cursor-default">
        <p className="w-[1000px] leading-10">
          我是<span className="text-red-600">全栈软件工程师</span>
          ，不是技术大佬，目标是未来能成为计算机大师。透过现象看本质，
          <span className="text-red-600">计算机编程≈内存＋数据结构＋算法</span>
          。但时常纠结知识的“深度”还是“广度”，其代价就是学习成本。广泛涉猎是有一定好处的，贵在“精通”(没有谁敢用这个词😂)1个领域，这才有可能成为行业翘楚。
        </p>
      </div>
    </section>
  )
}

export default MaskCursor
