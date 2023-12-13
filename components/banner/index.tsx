import Image from 'next/image'
import girl from '../../public/images/banner.png'

// 首页大图
export default function Banner() {
  return (
    <div className="h-[calc(100vh-40px-30px)] w-full box-border overflow-hidden relative">
      <Image
        src={girl}
        alt="banner placeholder"
        fill
        priority
        placeholder="blur"
        className="absolute w-full h-full left-0 top-0 bottom-0 right-0 object-cover origin-center rounded-tr rounded-tl"
      />
      <div className="flex flex-col gap-2 justify-end h-full w-full p-2 md:p-4 bg-gradient-to-b from-transparent to-black text-white absolute left-0 bottom-0 right-0 top-0 z-40">
        <section className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold animate-pulse">Yin Lei</h1>
          <p className="text-sm">行之力则知愈进，知之深则行愈达</p>
          <p className="text-sm">邮箱：yl1099129793@gmail.com</p>
        </section>
      </div>
    </div>
  )
}
