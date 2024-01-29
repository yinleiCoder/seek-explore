'use client'

import { MouseEvent, MouseEventHandler, useEffect, useRef } from 'react'
import { useSize } from 'ahooks'

type Size = {
  width: number
  height: number
}

/**
 * 用sin函数计算模拟抖动的秋千
 */
export default function Line() {
  const path = useRef<SVGPathElement>(null)
  const divContainerRef = useRef(null)
  const divContainerSize = useSize(divContainerRef)
  let progress = 0
  let time = Math.PI / 2
  let x = 0.5
  let requestId: number | null = null

  useEffect(() => {
    setPath(progress)
  }, [divContainerSize])

  const setPath = (progress: number) => {
    if (!divContainerSize) return
    const { width } = divContainerSize as Size
    // 二次贝塞尔曲线的控制点
    if (path.current) {
      path.current.setAttributeNS('', 'd', `M0 50 Q${width * x} ${50 + progress}, ${width} 50`)
    }
  }

  const manageMouseMove: MouseEventHandler<HTMLDivElement> = (e: MouseEvent<HTMLElement>) => {
    const { movementY, clientX } = e
    const { left, width } = path.current!.getBoundingClientRect()
    x = (clientX - left) / width
    progress += movementY
    setPath(progress)
  }

  const manageMouseLeave: MouseEventHandler<HTMLDivElement> = (e: MouseEvent<HTMLElement>) => {
    animateOut()
  }

  const manageMouseEnter: MouseEventHandler<HTMLDivElement> = (e: MouseEvent<HTMLElement>) => {
    if (requestId) {
      window.cancelAnimationFrame(requestId)
      resetAnimation()
    }
  }

  // 线性插值函数
  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

  const animateOut = () => {
    const newProgress = progress * Math.sin(time)
    time += 0.2
    setPath(newProgress)
    progress = lerp(progress, 0, 0.025)
    if (Math.abs(progress) > 0.75) {
      requestId = window.requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2
    progress = 0
  }

  return (
    <div className="hidden md:block h-[20vh] w-full box-border overflow-hidden relative bg-zinc-900 dark:bg-zinc-800">
      <section className="w-full h-full relative flex flex-col justify-center items-center">
        <div className="hidden xl:block h-[1px] w-[80%] relative mb-[20px]" ref={divContainerRef}>
          <div
            onMouseEnter={manageMouseEnter}
            onMouseMove={manageMouseMove}
            onMouseLeave={manageMouseLeave}
            className="box h-[40px] relative top-[-20px] z-10 hover:h-[150px] hover:top-[-75px]"
          ></div>
          <svg className="w-full h-[100px] absolute top-[-50px]">
            <path ref={path} strokeWidth={1} stroke="white" fill="transparent"></path>
          </svg>
        </div>
      </section>
    </div>
  )
}
