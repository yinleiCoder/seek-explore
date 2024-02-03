import Image from 'next/image'
import Link from 'next/link'
import TTSAudioPlayer from '@/components/audioPlayer/ttsAudio'
import Comment from '@/components/comment'
import Markdown from '@/components/markdown'
import { getPostBySlug } from '@/lib/post'
import { dateFormat } from '@/utils/date'
import './index.css'

// export const dynamic = 'force-dynamic'
export const revalidate = 120 // 每两分钟重新验证数据(生产阶段)

// export const generateStaticParams = async () => {
//   const slugs = getPostSlugs()
//   return slugs.map(item => {
//     slug: item
//   })
// }

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, ['title', 'description'])
  return {
    title: post.title,
    description: post.description,
  }
}

export default function PostPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const slug = params.slug
  const post = getPostBySlug(slug, ['title', 'description', 'date', 'tag', 'content'])
  return (
    <main className="grid p-2 md:p-0 grid-cols-12 gap-y-5 container max-w-7xl mx-auto">
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 flex gap-3 items-center">
        <Link href={'/me'}>
          <Image
            src={'/images/author.jpg'}
            width={50}
            height={50}
            alt="author yinlei"
            className="rounded-full border-2 border-black"
          />
        </Link>
        <div className="flex flex-col justify-start gap-1">
          <p className="font-bold text-lg">Yin Lei</p>
          <div className="flex text-sm gap-1 text-gray-500">
            <span>{dateFormat(post.date ?? '')}</span>
            <span>/</span>
            <span>{post.tag}</span>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 flex flex-col items-start gap-1">
        <h1 className="text-xl lg:text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
        <div className="h-[1px] border  w-full rounded"></div>
      </div>
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 hidden md:block">
        <TTSAudioPlayer markdownText={post.content ?? ''} />
      </div>
      <article className="prose prose-sm md:prose-base dark:prose-invert prose-a:underline prose-a:font-medium prose-img:rounded-lg prose-img:object-cover prose-video:aspect-video prose-a:after:content-[''] prose-strong:text-red-600 prose-table:border prose-thread:!rounded-md prose-thead:bg-primary hover:prose-tr:bg-primary/75 dark:hover:prose-tr:bg-primary/75 dark:prose-thead:bg-zinc-800 prose-thead:rounded-md prose-th:text-white prose-blockquote:border prose-blockquote:border-black prose-blockquote:shadow prose-blockquote:shadow-black/50 dark:prose-blockquote:border-gray-300 dark:prose-blockquote:shadow-md dark:prose-blockquote:shadow-primary/50 prose-blockquote:rounded-lg prose-blockquote:px-3 prose-img:mx-auto  hover:prose-a:text-zinc-600 dark:hover:prose-a:text-gray-400 max-w-none col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 relative">
        <Markdown>{post.content ?? ''}</Markdown>
      </article>
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11">
        <Comment />
      </div>
    </main>
  )
}
