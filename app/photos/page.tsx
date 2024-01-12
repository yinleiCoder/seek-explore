import { client, urlFor } from '@/lib/sanity'
import { BlogSimple } from '@/types/blog'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '睹物思人',
  description: '我们把握不住时间，但是照片为我们定格了难忘的瞬间',
}

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      'description': smallDescription,
      'blogSlug': slug.current,
      titleImage,
  }`
  const data = await client.fetch(query)
  return data
}

export default async function PhotoPage() {
  const data: BlogSimple[] = await getData()
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {data.map((post, index) => {
          return (
            <div key={index} className="w-full aspect-video relative">
              <img
                src={urlFor(post.titleImage).url()}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* <Image
                src={urlFor(post.titleImage).url()}
                alt={post.title}
                className="object-cover w-full h-full"
                fill
              /> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}
