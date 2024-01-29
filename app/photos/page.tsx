import { client, urlFor } from '@/lib/sanity'
import { Metadata } from 'next'
import PhotoGallery from '@/components/gallery'

export const metadata: Metadata = {
  title: '睹物思人',
  description: '我们把握不住时间，但是照片为我们定格了难忘的瞬间',
}

export const revalidate = 300 // 每5分钟重新验证数据

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

// const data: BlogSimple[] = await getData()
{
  /* <div className="grid grid-cols-3 gap-2">
  {data.map((post, index) => {
    return (
      <div key={index} className="w-full aspect-video relative">
        <img
          src={urlFor(post.titleImage).url()}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    )
  })}
</div> */
}

export default async function PhotoPage() {
  return (
    <>
      <section className="px-2 min-h-[calc(100vh-56px)]">
        <PhotoGallery />
      </section>
    </>
  )
}
