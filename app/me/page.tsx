import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import ParallaxGallery from '@/components/parallax'
import MaskCursor from '@/components/cursor'

export const metadata: Metadata = {
  title: '了解我',
  description: '联系我？与我合作？期待您的来电',
}

const Pixel = dynamic(() => import('../../components/pixel'), {
  ssr: false,
})

export default function MePage() {
  return (
    <main className="flex flex-col">
      <Pixel>
        <p>Creative development is future proof</p>
      </Pixel>
      <ParallaxGallery />
      <MaskCursor />
    </main>
  )
}
