import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/scene'), {
  ssr: false,
})

export default function NotFound() {
  return (
    <main className="relative w-full h-screen">
      <Scene />
    </main>
  )
}
