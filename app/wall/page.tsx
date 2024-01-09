import Comment from '@/components/comment'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '停止EMO',
  description: '留下你最想说的话吧，10年，20年...这里依然保存着你当初留下的话',
}

// 左边是照片，右边是评论
export default function PhotoPage() {
  return (
    <div className="flex flex-col p-2 gap-5 container lg:max-w-5xl mx-auto">
      <section className="flex-1 bg-red-300">自己封装音乐播放器：诀别书</section>
      <section className="flex-1">
        <Comment placeholder="夜深人静，就把心掏出来缝缝补补，一觉醒来，又是信心百倍🤔" />
      </section>
    </div>
  )
}
