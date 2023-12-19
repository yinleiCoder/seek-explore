'use client'

import { MouseEvent, MouseEventHandler, useEffect, useRef } from 'react'
import { useSize } from 'ahooks'
import Magnetic from '../magnetic'

type Size = {
  width: number
  height: number
}

/**
 * 用sin函数计算模拟抖动的秋千
 */
export default function Banner() {
  const path = useRef<SVGPathElement>(null)
  const divContainerRef = useRef(null)
  const divContainerSize = useSize(divContainerRef)
  let progress = 0
  let time = Math.PI / 2
  let x = 0.5
  let requestId: number | null = null
  const skills = [
    'C',
    'C++',
    'JavaScript',
    'NodeJS',
    'Vue',
    'React',
    'Python',
    'Pytorch',
    'Java',
    'SpringBoot',
    'Kotlin',
    'Android',
    'Go',
    'C#',
    'Flutter',
    'FFmpeg',
    'MySQL',
    'Linux',
    'Blender',
    'PhotoShop',
  ]

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
    <div className="h-[calc(100vh-64px-30px)] w-full box-border overflow-hidden relative bg-indigo-500 flex flex-col justify-end md:justify-center items-center text-white py-2">
      <div className="h-[1px] w-[80%] relative mb-[20px]" ref={divContainerRef}>
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
      <div className="w-[80%] flex justify-end">
        <div className="flex flex-col items-end gap-2">
          <section className="flex flex-col items-end">
            <h1 className="text-2xl font-bold">Yin Lei</h1>
            <p>Welcome, handsome boy or beautiful girl😄I am a full stack software engineer.</p>
          </section>
          <section className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Magnetic key={skill}>
                <span className="border rounded-lg px-2 py-1 cursor-pointer duration-300 hover:bg-indigo-400 text-xs">
                  {skill}
                </span>
              </Magnetic>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
