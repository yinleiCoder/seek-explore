import type { Post } from '@/types/post'
import { Fragment } from 'react'
import Card from '../card'

export default function CardList({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-3xl mx-2 md:mx-auto my-2 md:my-5 flex flex-col gap-4 md:gap-5 lg:gap-6">
      {posts.map((post, index) => {
        return (
          <Fragment key={post.slug}>
            <Card {...post} />
          </Fragment>
        )
      })}
    </div>
  )
}
