import dynamic from 'next/dynamic'

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
