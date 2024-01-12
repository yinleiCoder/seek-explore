import { VideoPlayer } from '@/components/videoPlayer'
import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa6'

export const metadata: Metadata = {
  title: '雅俗共赏',
  description: '一个人看片有什么意思，一起来啊！',
}

export default async function WatchPage() {
  const session = await auth()
  if (!session) {
    return (
      <main className="w-full flex-1 flex items-center justify-center">
        <Link href={'/login'}>
          <span className="text-4xl hover:text-indigo-400 cursor-pointer">
            <FaLock />
          </span>
        </Link>
      </main>
    )
  }

  return (
    <main className="container max-w-5xl mx-auto flex-1 flex flex-col items-center">
      <section className="w-full">
        <VideoPlayer />
      </section>
      <section>播放列表</section>
    </main>
  )
}
