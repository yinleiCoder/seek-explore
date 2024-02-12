import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import ParallaxGallery from '@/components/parallax'
import MaskCursor from '@/components/cursor'
import { AudioPlayer } from '@/components/audioPlayer'

export const metadata: Metadata = {
  title: '了解我',
  description: '一名热爱C++的全栈软件工程师',
}

const Pixel = dynamic(() => import('../../components/pixel'), {
  ssr: false,
})

export default function MePage() {
  return (
    <>
      <AudioPlayer
        track={'/audios/雀台.m4a'}
        isController={false}
        className="fixed left-4 bottom-4 z-[99]"
      />
      <Pixel>
        <p>面向信仰编程</p>
      </Pixel>
      <ParallaxGallery />
      <MaskCursor />
    </>
  )
}
