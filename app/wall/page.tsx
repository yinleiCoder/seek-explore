import Comment from '@/components/comment'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '停止EMO',
  description: '留下你最想说的话吧，10年，20年...这里依然保存着你当初留下的话',
}

// 左边是照片，右边是评论
export default function PhotoPage() {
  return (
    <div className="flex flex-col md:flex-row p-2 gap-5">
      <section className="flex-1 bg-red-300"></section>
      <section className="flex-1">
        <Comment placeholder="留下你最想对Ta说的话吧🤔" />
      </section>
    </div>
  )
}
