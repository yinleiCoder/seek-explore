import { Metadata } from 'next'
import { VideoPlayer } from '@/components/videoPlayer'
import { FaPlay } from 'react-icons/fa'
import { MdSort } from 'react-icons/md'
import { IoMdMore } from 'react-icons/io'
import { FaRandom } from 'react-icons/fa'
import Button from '@/components/button'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '教书育人',
  description: '视频科普，不止是计算机哦！',
}

export default async function WatchPage() {
  return (
    <main className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-56px)]">
      <div className="w-full lg:w-[30%] xl:w-[25%] border-b flex flex-col items-center gap-3 p-5 justify-center bg-[#F9EFDB] lg:rounded-xl lg:ml-3 lg:mt-3 lg:mb-3">
        <div className="w-full flex-1 flex lg:flex-col gap-3">
          <div className="flex-1 w-full aspect-video relative rounded-xl overflow-hidden">
            <Image
              src={
                'https://img.zcool.cn/community/01pvx9eqsg4qse5tslaw0k3030.jpg?x-oss-process=image/format,webp'
              }
              className="object-cover"
              fill
              alt="video banner"
            />
          </div>
          <div className="flex-1 h-full flex flex-col gap-2 justify-center items-start text-black">
            <h1 className="text-2xl font-bold">视频标题</h1>
            <div>作者</div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>视频发布时间</span>
              <span>视频浏览次数</span>
              <span>视频总时长</span>
            </div>
          </div>
        </div>
        <div className="w-full flex h-[30px] gap-2">
          <Button
            icon={FaPlay}
            className="flex-1 bg-white  rounded-full flex items-center justify-center text-sm gap-x-2 hover:bg-zinc-100 text-black py-2 hover:shadow"
            iconClassName="text-sm"
          >
            播放
          </Button>
          <Button
            icon={FaRandom}
            className="flex-1 bg-white  rounded-full flex items-center justify-center text-sm gap-x-2 hover:bg-zinc-100 text-black py-2 hover:shadow"
            iconClassName="text-sm"
          >
            随机播放
          </Button>
        </div>
      </div>
      <div className="flex-1 p-5">
        <div className="my-2">
          <Button icon={MdSort} className="text-sm hover:bg-zinc-100 p-1">
            排序
          </Button>
        </div>
        <div className="w-full">
          {/* 每条video */}
          <div className="w-full h-[110px] rounded-md hover:bg-zinc-100 flex items-center justify-between gap-x-2 p-2 cursor-pointer">
            <div className="flex gap-x-2 h-full">
              <div className="relative h-full aspect-video overflow-hidden rounded-lg">
                <Image
                  src={
                    'https://img.zcool.cn/community/01pvx9eqsg4qse5tslaw0k3030.jpg?x-oss-process=image/format,webp'
                  }
                  className="object-cover"
                  fill
                  alt="video banner"
                />
                <div className="absolute bottom-1 right-1 bg-zinc-900 p-1 flex justify-center items-center rounded-md overflow-hidden">
                  <span className="text-xs font-bold text-white">16:01</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-lg font-bold">视频信息</h1>
                <div
                  className="text-sm flex flex-wrap gap-1 text-gray-500
              "
                >
                  <span>尹磊</span>
                  <span>·</span>
                  <span>6243次观看</span>
                  <span>·</span>
                  <span>1年前</span>
                </div>
              </div>
            </div>
            <div>
              <Button
                icon={IoMdMore}
                iconClassName="text-xl"
                className="p-1 bg-zinc-100 rounded-full"
              />
            </div>
          </div>
          {/* 每条video */}
          <div className="w-full h-[110px] rounded-md hover:bg-zinc-100 flex items-center justify-between gap-x-2 p-2 cursor-pointer">
            <div className="flex gap-x-2 h-full">
              <div className="relative h-full aspect-video overflow-hidden rounded-lg">
                <Image
                  src={
                    'https://img.zcool.cn/community/01pvx9eqsg4qse5tslaw0k3030.jpg?x-oss-process=image/format,webp'
                  }
                  className="object-cover"
                  fill
                  alt="video banner"
                />
                <div className="absolute bottom-1 right-1 bg-zinc-900 p-1 flex justify-center items-center rounded-md overflow-hidden">
                  <span className="text-xs font-bold text-white">16:01</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-lg font-bold">视频信息</h1>
                <div
                  className="text-sm flex flex-wrap gap-1 text-gray-500
              "
                >
                  <span>尹磊</span>
                  <span>·</span>
                  <span>6243次观看</span>
                  <span>·</span>
                  <span>1年前</span>
                </div>
              </div>
            </div>
            <div>
              <Button
                icon={IoMdMore}
                iconClassName="text-xl"
                className="p-1 bg-zinc-100 rounded-full"
              />
            </div>
          </div>
          {/* 每条video */}
          <div className="w-full h-[110px] rounded-md hover:bg-zinc-100 flex items-center justify-between gap-x-2 p-2 cursor-pointer">
            <div className="flex gap-x-2 h-full">
              <div className="relative h-full aspect-video overflow-hidden rounded-lg">
                <Image
                  src={
                    'https://img.zcool.cn/community/01pvx9eqsg4qse5tslaw0k3030.jpg?x-oss-process=image/format,webp'
                  }
                  className="object-cover"
                  fill
                  alt="video banner"
                />
                <div className="absolute bottom-1 right-1 bg-zinc-900 p-1 flex justify-center items-center rounded-md overflow-hidden">
                  <span className="text-xs font-bold text-white">16:01</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-lg font-bold">视频信息</h1>
                <div
                  className="text-sm flex flex-wrap gap-1 text-gray-500
              "
                >
                  <span>尹磊</span>
                  <span>·</span>
                  <span>6243次观看</span>
                  <span>·</span>
                  <span>1年前</span>
                </div>
              </div>
            </div>
            <div>
              <Button
                icon={IoMdMore}
                iconClassName="text-xl"
                className="p-1 bg-zinc-100 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

{
  /* <div className="mx-auto lg:container lg:max-w-6xl">
  //   <VideoPlayer />
  // </div> */
}
