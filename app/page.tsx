import Image from 'next/image'
import FloatingShapes from '@/components/floatingShape'
import CardList from '@/components/list'
import Marquee from '@/components/marquee'
import Subscribe from '@/components/subscribe'
import { getAllPosts } from '@/lib/post'

const news = [
  {
    content: '衷心祝贺堂弟尹伟成功考取四川省广元市公务，你是为兄的骄傲!😁',
    person: '尹伟',
    personAvatar: '/images/author.jpg',
    time: '2022年',
  },
  {
    content: '沉痛悼念我的大爷爷尹才兴，生前辛苦，长者驾鹤西去、与世长辞!!!😢',
    person: '尹才兴',
    personAvatar: '/images/author.jpg',
    time: '2023年1月',
  },
  {
    content: '尹磊于德阳中江事业单位笔试第二，面试第一，综合成绩差0.1分上岸',
    person: '尹磊',
    personAvatar: '/images/author.jpg',
    time: '2023年',
  },
  {
    content: '尹磊于绵阳市三台县特岗计算机初中教师进面，综合成绩差2分上岸',
    person: '尹磊',
    personAvatar: '/images/author.jpg',
    time: '2023年',
  },
  {
    content: '尹磊于雅安市汉源县计算机职高教师进面，综合成绩差1分上岸',
    person: '尹磊',
    personAvatar: '/images/author.jpg',
    time: '2023年',
  },
]

export default function HomePage() {
  const posts = getAllPosts(['title', 'description', 'date', 'slug'])
  return (
    <>
      <section className="w-full h-[50vh] lg:h-[calc(100vh-56px-40px)] flex">
        <FloatingShapes />
      </section>
      <Marquee className="mb-8">
        {news.map((item, index) => {
          return (
            <div
              key="item"
              className="rounded-md shadow-md mx-2 border bg-white dark:bg-zinc-800 dark:border-none text-sm w-[250px] overflow-hidden group"
            >
              <div className="flex items-start px-5 py-3 gap-5">
                <div className="flex-1 leading-loose">{item.content}</div>
                <div className="w-[50px] h-full">
                  <Image
                    className="rounded-full"
                    alt="yinlei"
                    src={item.personAvatar!}
                    width={50}
                    height={50}
                    priority
                  />
                </div>
              </div>
              <div className="w-full border border-zinc-100 dark:border-zinc-600"></div>
              <div className="flex justify-between px-5 py-3 text-zinc-400">
                <span>{item.time}</span>
                <span className="group-hover:text-red-800">{item.person}</span>
              </div>
            </div>
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
