import Comment from '@/components/comment'

export default function PhotoPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full aspect-video object-cover overflow-hidden">unsplash.com数据</div>
      <section className="w-full grid grid-cols-12 p-3">
        <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-12 lg:md:col-start-4 lg:col-end-10">
          <Comment />
        </div>
      </section>
    </div>
  )
}
