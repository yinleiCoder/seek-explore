import dynamic from 'next/dynamic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '了解我',
  description: '联系我？与我合作？期待您的来电',
}

const Pixel = dynamic(() => import('../../components/pixel'), {
  ssr: false,
})

export default function MePage() {
  return (
    <main className="flex-1 flex flex-col">
      <Pixel>
        <p>写好每一个像素</p>
      </Pixel>
      <section className="w-full h-screen bg-purple-600"></section>
    </main>
  )
}
