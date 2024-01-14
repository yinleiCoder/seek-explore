'use client'

import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import StackCard from '@/components/card/stackCard'
import { News } from '@/types/news'
import { useEffect, useRef } from 'react'
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { dateDiff } from '@/utils/date'
import { fireSchoolPride } from '@/lib/confetti'

const news: News[] = [
  {
    id: uuidv4(),
    title: '2023年新华社年度照片·领航',
    date: '2024-01-05',
    category: '学习强国',
    content:
      '2023年1月18日，中共中央总书记、国家主席、中央军委主席习近平在北京通过视频连线看望慰问基层干部群众，向全国各族人民致以新春的美好祝福（拼版照片）。新华社记者 谢环驰 李涛 摄',
    image: 'https://boot-img.xuexi.cn/image/1004/process/14824e54555a4bfca90be5e8122b6d2f.jpg',
    source: '来源：新华网',
    link: 'https://www.xuexi.cn/lgpage/detail/index.html?id=10522930834152721842&item_id=10522930834152721842',
  },
  {
    id: uuidv4(),
    title: '时政新闻眼|如何打赢反腐败斗争攻坚战持久战，习近平作出战略部署',
    date: '2024-01-09',
    category: '学习强国',
    content:
      '在今年的二十届中央纪委三次全会上，总书记分析了反腐败斗争的最新形势：经过新时代十年坚持不懈的强力反腐，反腐败斗争取得压倒性胜利并全面巩固，但形势依然严峻复杂。“我们对反腐败斗争的新情况新动向要有清醒认识，对腐败问题产生的土壤和条件要有清醒认识，以永远在路上的坚韧和执着，精准发力、持续发力，坚决打赢反腐败斗争攻坚战持久战。”',
    image: 'https://boot-img.xuexi.cn/image/1005/process/b7f6b05c05374ec3be3ee01fa0a21722.jpg',
    source: '来源：中央广播电视总台',
    link: 'https://www.xuexi.cn/lgpage/detail/index.html?id=14190530098736542037&item_id=14190530098736542037',
  },
  {
    id: uuidv4(),
    title: '时政长镜头|守护平安',
    date: '2024-01-10',
    category: '学习强国',
    content:
      '习近平总书记回信写道，“你们的父辈勇于担当作为，甘于牺牲奉献，他们的精神永远值得铭记和发扬。”他勉励同学们以英雄的父辈为榜样，坚定理想信念，刻苦学习训练，努力练就报国为民的过硬本领，矢志不渝做党和人民的忠诚卫士。',
    image: 'https://boot-img.xuexi.cn/image/1005/process/9dfd086239f74762a4799bc08935cc92.png',
    source: '来源：中央广播电视总台',
    link: 'https://www.xuexi.cn/lgpage/detail/index.html?id=15728411298079458489&item_id=15728411298079458489',
  },
  {
    id: uuidv4(),
    title: '习近平在二十届中央纪委三次全会上发表重要讲话',
    date: '2024-01-08',
    category: '学习强国',
    content:
      '1月8日，中共中央总书记、国家主席、中央军委主席习近平在中国共产党第二十届中央纪律检查委员会第三次全体会议上发表重要讲话。新华社记者 鞠鹏 摄',
    image:
      'https://boot-img.xuexi.cn/image/1004/upload/202401/6276eaadd5df4775899f72b2410b56c1.jpg',
    source: '来源：学习强国学习平台',
    link: 'https://www.xuexi.cn/lgpage/detail/index.html?id=17234179804184221279&item_id=17234179804184221279',
  },
  {
    id: uuidv4(),
    title: '习近平同马尔代夫总统穆伊兹会谈',
    date: '2024-01-10',
    category: '学习强国',
    content:
      '1月10日下午，国家主席习近平在北京人民大会堂同来华进行国事访问的马尔代夫总统穆伊兹举行会谈。这是会谈前，习近平在人民大会堂北大厅为穆伊兹举行欢迎仪式。新华社记者 丁海涛 摄',
    image: 'https://boot-img.xuexi.cn/image/1004/process/dd534b7f310643d294bf0a07686acd4b.jpg',
    source: '来源：学习强国学习平台',
    link: 'https://www.xuexi.cn/lgpage/detail/index.html?id=2515558621574995706&item_id=2515558621574995706',
  },
]

export default function NewsPage() {
  const cardWrapper = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardWrapper,
    offset: ['start start', 'end end'],
  })
  const initCount = useMotionValue(0)
  const rounded = useTransform(initCount, latest => Math.round(latest))
  const countDown = dateDiff('2024/2/9', new Date(), 'day')

  useEffect(() => {
    const controls = animate(initCount, countDown, { type: 'spring' })
    fireSchoolPride()
    return controls.stop
  }, [])

  return (
    <main>
      <section className="w-full h-[100vh] flex flex-col justify-center items-center box-border">
        <div className="flex flex-col justify-start gap-2">
          <div className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
            <span>距离</span>
            <span>2024年除夕夜💥</span>
            <span>还有</span>
            <motion.span
              className="text-red-900 dark:text-red-600 text-4xl md:text-5xl mx-3"
              transition={{ type: 'inertia', velocity: 50 }}
            >
              {rounded}
            </motion.span>
            <span>天</span>
          </div>
          <div className="flex items-start">
            <p className="font-bold">近期重要事项：</p>
            <ul>
              <li>2024.03 四川省事业单位笔试</li>
              <li>2024.03 四川省教师统考笔试</li>
              <li>2024.05 四川省特岗教师统考笔试</li>
            </ul>
          </div>
        </div>
      </section>
      <ReactLenis root>
        <div ref={cardWrapper} className="container max-w-5xl mx-auto p-2 md:p-0">
          {news.map((newItem, index) => {
            const targetScale = 1 - (news.length - index) * 0.05
            return (
              <StackCard
                key={newItem.id}
                index={index} // 每个卡片的唯一索引
                range={[index * 0.2, 1]} // 滚动数值起始
                targetScale={targetScale} // 目标缩放
                progress={scrollYProgress} // 父组件的滚动进度控制内部卡片缩放
                {...newItem}
              />
            )
          })}
        </div>
      </ReactLenis>
    </main>
  )
}
