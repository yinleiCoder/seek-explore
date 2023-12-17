'use client'

import { MouseEventHandler, useEffect, useState } from 'react'
import { useSize } from 'ahooks'

type Size = {
  width: number
  height: number
}

export default function Pixel() {
  const { width: windowWidth, height: windowHeight } = useSize(
    document.querySelector('body')
  ) as Size
  const [blockCount, setBlockCount] = useState(0)

  const blockSize = windowWidth * 0.05

  useEffect(() => {
    const calculateBlockCount = () => {
      const newBlockCount = Math.ceil(windowHeight / blockSize)
      // 更新块数
      setBlockCount(newBlockCount)
    }

    // 初始化时计算一次
    calculateBlockCount()

    // 窗口大小改变时重新计算
    window.addEventListener('resize', calculateBlockCount)

    // 清理事件监听器
    return () => {
      window.removeEventListener('resize', calculateBlockCount)
    }
  }, [windowHeight, blockSize])

  const getBlocks = () => {
    return [...Array(blockCount).keys()].map(index => (
      <div
        onMouseEnter={e => {
          colorSize(e)
        }}
        key={`b_${index}`}
        className="w-full h-[5vw]"
      ></div>
    ))
  }

  const colorSize: MouseEventHandler<HTMLDivElement> = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    target.style.backgroundColor = 'black'
    setTimeout(() => {
      target.style.backgroundColor = 'transparent'
    }, 300)
  }

  return (
    <main className="h-screen w-full flex justify-center items-center bg-white relative overflow-hidden">
      <div className="w-[70%] uppercase text-[4vw] font-extrabold text-center mix-blend-difference text-white z-10 pointer-events-none">
        <p>有缘之人</p>
        <p>可以逆转时光，回到过去</p>
      </div>
      <div className="absolute w-full h-full flex left-0 top-0 bottom-0">
        {[...Array(20).keys()].map((_, index) => (
          <div key={index} className="w-[5vw] h-full">
            {getBlocks()}
          </div>
        ))}
      </div>
    </main>
  )
}
