import FloatingShapes from '@/components/floatingShape'
import CardList from '@/components/list'
import Marquee from '@/components/marquee'
import Subscribe from '@/components/subscribe'
import { getAllPosts } from '@/lib/post'

const newsMarquee = [
  '[2022年]热烈祝贺堂弟尹伟成功考取四川省广元市公务员一职',
  '[2023年]尹磊编制进面3次:德阳中江事业单位、雅安汉源教师、三台特岗教师综合第二名遗憾落榜',
  '[2023年1月]沉痛悼念大爷爷尹才兴，长者驾鹤西去、与世长辞',
]

export default function HomePage() {
  const posts = getAllPosts(['title', 'description', 'date', 'slug'])
  return (
    <>
      <section className="w-full h-[50vh] lg:h-[calc(100vh-56px-40px)] flex">
        <FloatingShapes />
      </section>
      <Marquee className="h-8 lg:h-10 bg-zinc-900 dark:bg-zinc-800 text-white font-bold text-sm">
        {newsMarquee.map((item, index) => {
          return (
            <span className="mx-10" key={index}>
              {item}
            </span>
          )
        })}
      </Marquee>
      <section className="lg:container lg:max-w-3xl lg:mx-auto p-3 lg:p-0 my-2">
        <CardList posts={posts} />
        <Subscribe />
      </section>
    </>
  )
}
