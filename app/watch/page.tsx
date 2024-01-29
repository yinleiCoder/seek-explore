import { Metadata } from 'next'
import { VideoPlayer } from '@/components/videoPlayer'

export const metadata: Metadata = {
  title: '教书育人',
  description: '视频科普，不止是计算机哦！',
}

export default async function WatchPage() {
  return (
    <>
      <div className="mx-auto lg:container lg:max-w-6xl">
        <VideoPlayer />
      </div>
    </>
  )
}
