import Image from 'next/image'
import Link from 'next/link'
import TTSAudioPlayer from '@/components/audioPlayer/ttsAudio'
import Comment from '@/components/comment'
import Markdown from '@/components/markdown'
import { getPostBySlug, getPostSlugs } from '@/lib/post'
import { dateFormat } from '@/utils/date'
import './index.css'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 120 // 每两分钟重新验证数据(生产阶段)

export const generateStaticParams = async () => {
  const slugs = getPostSlugs()
  return slugs.map(item => {
    slug: item
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { post } = getPostBySlug(params.slug, ['title', 'description'])
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
  const { post, toc } = getPostBySlug(slug, ['title', 'description', 'date', 'tag', 'content'])
  return (
    <main className="grid p-2 md:p-0 grid-cols-12 container mx-auto gap-y-2 xl:px-2">
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-5 lg:col-end-13 flex gap-3 items-center">
        <Link href={'/me'}>
          <Image
            src={'/images/author.jpg'}
            width={50}
            height={50}
            alt="author yinlei"
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col justify-start gap-1">
          <p className="font-medium text-lg">Yin Lei</p>
          <div className="flex text-sm gap-1 text-gray-500">
            <span>{dateFormat(post.date ?? '')}</span>
            <span>/</span>
            <span>{post.tag}</span>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-5 lg:col-end-13 flex flex-col items-start gap-1">
        <h1 className="text-xl lg:text-2xl font-bold hover:underline">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
        <div className="h-[1px] border  w-full rounded"></div>
      </div>
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-5 lg:col-end-13 hidden md:block">
        <TTSAudioPlayer markdownText={post.content ?? ''} />
      </div>
      <article className="prose prose-sm md:prose-base dark:prose-invert prose-a:underline prose-a:font-medium prose-img:rounded-lg prose-img:object-cover prose-video:aspect-video prose-a:after:content-[''] prose-strong:text-red-600 prose-table:border prose-thread:!rounded-md prose-thead:bg-primary hover:prose-tr:bg-primary/75 dark:hover:prose-tr:bg-primary/75 dark:prose-thead:bg-zinc-800 prose-thead:rounded-md dark:prose-th:text-white prose-img:mx-auto prose-blockquote:bg-[#CDFADB] prose-blockquote:border-primary prose-blockquote:not-italic prose-blockquote:px-2 prose-blockquote:py-1 prose-blockquote:rounded-r-lg prose-li:marker:text-primary hover:prose-a:text-zinc-600 dark:hover:prose-a:text-gray-400 max-w-none col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-5 lg:col-end-13 relative">
        <Markdown>{post.content ?? ''}</Markdown>
      </article>
      <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-10">
        <Suspense fallback={<p>Loading...</p>}>
          <Comment />
        </Suspense>
      </div>
      <div className="hidden w-full lg:block lg:col-start-1 lg:col-end-5 lg:row-start-1 relative lg:row-span-5 lg:pr-8">
        <details
          className="border border-black text-zinc-900 rounded-lg p-2 sticky top-4 max-h-[80vh] overflow-hidden overflow-y-auto bg-primary select-none"
          open
        >
          <summary className="text-lg font-semibold cursor-pointer">目录</summary>
          <ul className="mt-4 text-base font-medium">
            {toc.map(heading => {
              return (
                <li key={heading.text} className="py-1 hover:bg-zinc-100 rounded-md">
                  <a
                    href={`#${heading.text}`}
                    data-level={heading.level}
                    className="data-[level=two]:pl-0 data-[level=two]:pt-2 data-[level=two]:border-t data-[level=three]:pl-6 border-solid border-zinc-900 flex items-center justify-start"
                  >
                    {heading.level === 'three' ? (
                      <span className="flex w-1 h-1 rounded-full bg-zinc-900 mr-2">&nbsp;</span>
                    ) : null}
                    <span>{heading.text}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </details>
      </div>
    </main>
  )
}
