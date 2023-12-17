import dynamic from 'next/dynamic'

const Pixel = dynamic(() => import('../../components/pixel'), {
  ssr: false,
})

export default function MePage() {
  return (
    <div className="flex flex-col">
      <Pixel />
    </div>
  )
}
