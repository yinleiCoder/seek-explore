import { Metadata } from 'next'
import { AudioPlayer } from '@/components/audioPlayer'
import Comment from '@/components/comment'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '留言墙',
  description: '留下你最想说的话吧，10年，20年...这里依然保存着你当初留下的话',
}

export default function WallPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col p-2 md:p-0 gap-5 lg:container lg:max-w-3xl mx-auto">
      <section className="w-full">
        <AudioPlayer track="/audios/thingsYouSaid.m4a" />
      </section>
      <section className="w-full mt-2">
        <Suspense fallback={<p>Loading...</p>}>
          <Comment placeholder="这里是属于你的天空🤔" />
        </Suspense>
      </section>
    </div>
  )
}
