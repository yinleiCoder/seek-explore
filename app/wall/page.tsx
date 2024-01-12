import { Metadata } from 'next'
import { AudioPlayer } from '@/components/audioPlayer'
import Comment from '@/components/comment'

export const metadata: Metadata = {
  title: '留言墙',
  description: '留下你最想说的话吧，10年，20年...这里依然保存着你当初留下的话',
}

export default function WallPage() {
  return (
    <div className="min-h-[calc(100vh-64px-35px)] flex flex-col p-2 gap-5 container max-w-5xl mx-auto">
      <section className="w-full mt-2 bgred-300">
        <AudioPlayer track="/audios/诀别书.m4a" />
      </section>
      <section className="w-full">
        <Comment placeholder="夜深人静，就把心掏出来缝缝补补，一觉醒来，又是信心百倍🤔" />
      </section>
    </div>
  )
}
