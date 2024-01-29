import { Fragment } from 'react'
import type { Post } from '@/types/post'
import Card from '../card'

export default function CardList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-5 lg:gap-y-6">
      {posts.map(post => {
        return (
          <Fragment key={post.slug}>
            <Card {...post} />
          </Fragment>
        )
      })}
    </div>
  )
}
