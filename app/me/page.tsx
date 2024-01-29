import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import ParallaxGallery from '@/components/parallax'
import MaskCursor from '@/components/cursor'
import { AudioPlayer } from '@/components/audioPlayer'
import Cube3D from '@/components/cube'

export const metadata: Metadata = {
  title: '了解我',
  description: '联系我？与我合作？期待您的来电',
}

const Pixel = dynamic(() => import('../../components/pixel'), {
  ssr: false,
})

export default function MePage() {
  return (
    <>
      <AudioPlayer
        track={'/audios/不只是场梦.m4a'}
        isController={false}
        className="fixed left-4 bottom-4 z-[99]"
      />
      <Pixel>
        <p>面向信仰编程</p>
      </Pixel>
      <ParallaxGallery />
      <MaskCursor />
      <section className="w-full h-screen flex flex-col md:justify-center md:flex-row md:items-center">
        <Cube3D />
        <div className="flex-1 w-1/2 h-full text-xl font-medium leading-10 flex flex-col justify-center">
          <p className="indent-[2em]">学习其实可以允许浅尝辄止, 但不是浅尝辄止。</p>
          <p className="indent-[2em]">
            学习更像是尝到不想尝辄止，只要想尝，就不要止，尝到不想尝位置，自己心里舒服就可以，不必在乎别人的评价和外界的压力，学到的对又如何错又如何。内心的获得感和畅快感才是最重要的。
          </p>
          <p className="indent-[2em]">
            不要受到条条框框的影响，什么你不是这个方向的，别学。例如谁说不搞硬件就不能学数字电路了，学不精学的精不是区分点。尝和没尝是区分点。
          </p>
          <p className="indent-[2em]">
            从这个意义上说，浅尝辄止可以是尝到不想尝辄止的子集，只是没有找到自己的口味，再继续找就可以了，who
            cares
          </p>
          <p className="indent-[2em]">
            先有“广度”才能有“深度”，对于一个体系的知识，只学习其中一小部分就像管中窥豹，看不到全貌。需要多“浅尝”，整个体系全走通一遍，俯瞰视角会有完全不一样的认知，然后在回头单点“浅尝”中的盲区。
          </p>
        </div>
      </section>
    </>
  )
}
