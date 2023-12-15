import Banner from '@/components/banner'
import CardList from '@/components/list'
import Marquee from '@/components/marquee'
import { getPostMetaData } from '@/lib/post'

export default function HomePage() {
  const newsMarquee = [
    '[2022年]热烈祝贺堂弟尹伟成功考取四川省广元市公务员一职',
    '[2023年上半年]尹磊编制进面3次:德阳中江事业单位、雅安汉源教师、三台特岗教师综合第二名遗憾落榜',
    '[2023年1月]沉痛悼念大爷爷尹才兴，长者驾鹤西去、与世长辞',
  ]
  const posts = getPostMetaData()
  return (
    <>
      <Banner />
      <Marquee className="h-[30px] bg-zinc-900 dark:bg-zinc-800 py-1 text-white font-bold text-sm">
        {newsMarquee.map((item, index) => {
          return (
            <span className="mx-10" key={index}>
              {item}
            </span>
          )
        })}
      </Marquee>
      <CardList posts={posts} />
    </>
  )
}
