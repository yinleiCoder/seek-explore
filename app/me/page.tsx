import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import ParallaxGallery from '@/components/parallax'
import MaskCursor from '@/components/cursor'
import Line from '@/components/line'
import { AudioPlayer } from '@/components/audioPlayer'
import Magnetic from '@/components/magnetic'

export const metadata: Metadata = {
  title: '了解我',
  description: '一名热爱C++的全栈软件工程师',
}

const Pixel = dynamic(() => import('../../components/pixel'), {
  ssr: false,
})

const skills = ['你好', '😄', '我', '是', '喜欢', 'C++', '的', '全栈', '软件', '工程师', '尹磊']

export default function MePage() {
  return (
    <>
      <AudioPlayer
        track={'/audios/Novacaine.m4a'}
        isController={false}
        className="fixed left-4 bottom-4 z-[99]"
      />
      <Pixel>
        <p>面向信仰编程</p>
      </Pixel>
      <ParallaxGallery />
      <MaskCursor />
      <Line />
      <section className="flex justify-center items-center w-full h-screen gap-2">
        {skills.map(skill => (
          <Magnetic key={skill}>
            <span className="border rounded-md px-2 py-1 cursor-pointer duration-300 hover:bg-primary text-lg md:text-2xl">
              {skill}
            </span>
          </Magnetic>
        ))}
      </section>
    </>
  )
}
