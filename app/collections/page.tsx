import Marquee from '@/components/marquee'
import { collections } from '@/data/collection'

export default function CollectionPage() {
  return (
    <main>
      <Marquee className="h-6 lg:h-8 bg-zinc-900 dark:bg-zinc-800 text-white font-bold text-sm">
        {collections.map((item, index) => {
          return (
            <span className="mx-4" key={index}>
              {item}
            </span>
          )
        })}
      </Marquee>
      <section>软件工具</section>
      <section>开发文档</section>
    </main>
  )
}
