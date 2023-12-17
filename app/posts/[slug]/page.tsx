import Comment from '@/components/comment'
import Markdown from '@/components/markdown'
import { getPostBySlug, getPostSlugs } from '@/lib/post'
import { dateFormat } from '@/utils/date'

export const generateStaticParams = async () => {
  const slugs = getPostSlugs()
  return slugs.map(item => {
    slug: item
  })
}

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
    <>
      <main className="grid p-2 md:p-5 grid-cols-12 lg:gap-5">
        <article
          className="prose prose-sm md:prose-base dark:prose-invert prose-a:no-underline prose-a:text-indigo-500 prose-a:after:content-['📦'] prose-headings:scroll-mt-5 prose-img:rounded-lg
       prose-video:aspect-video prose-strong:text-indigo-500 prose-blockquote:border prose-blockquote:border-black prose-blockquote:shadow-md prose-blockquote:shadow-black/50 dark:prose-blockquote:border-gray-300 dark:prose-blockquote:shadow-md dark:prose-blockquote:shadow-indigo-500/50 prose-blockquote:rounded-lg max-w-none col-start-1 col-span-12 lg:col-start-1 lg:col-span-8"
        >
          <Markdown>{post.content ?? '文章待写...'}</Markdown>
        </article>
        <div className="hidden lg:col-start-9 lg:col-span-4 lg:flex lg:flex-col gap-5">
          <div className="bg-indigo-500 text-white p-2 shadow-lg shadow-indigo-500/50 rounded-md flex flex-col gap-2">
            <p className="font-bold">{post.title}</p>
            <p className="text-sm">{post.description}</p>
            <p className="text-sm">{dateFormat(post.date ?? new Date())}</p>
            <span className="border rounded-md text-center text-sm">{post.tag}</span>
          </div>
          <div className="bg-white dark:bg-zinc-800 p-2 shadow-md rounded-md">
            google广告暂待接入
          </div>
        </div>
      </main>
      <div className="p-2">
        <Comment />
      </div>
    </>
  )
}
