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
    <div className="flex flex-col">
      <Pixel>
        <p>写好每一个像素</p>
      </Pixel>
    </div>
  )
}
