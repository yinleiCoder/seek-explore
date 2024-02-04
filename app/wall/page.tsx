'use client'

import { Suspense, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { AudioPlayer } from '@/components/audioPlayer'
import ZoomParallax from '@/components/zoomParallax'
import Comment from '@/components/comment'

export default function WallPage() {
  useEffect(() => {
    // 平滑滚动
    const lenis = new Lenis()
    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <main className="w-full">
      <ZoomParallax />
      <div className="flex flex-col p-2 my-2 md:p-0 gap-5 lg:container lg:max-w-3xl mx-auto">
        <section className="w-full">
          <AudioPlayer track="/audios/thingsYouSaid.m4a" />
        </section>
        <section className="w-full mt-2">
          <Suspense fallback={<p>Loading...</p>}>
            <Comment placeholder="这里是属于你的天空🤔" />
          </Suspense>
        </section>
      </div>
    </main>
  )
}
