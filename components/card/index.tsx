import { Post } from '@/types/post'
import { dateFormat } from '@/utils/date'
import Link from 'next/link'

export default function Card({ title, description, word, date, slug }: Post) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className="flex flex-col gap-2 md:gap-3 bg-gray-200 dark:bg-zinc-800 dark:text-white rounded-md p-2 md:p-3 lg:p-5 hover:bg-indigo-500 dark:hover:bg-indigo-500 duration-300 hover:text-white group">
        <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        <p>{description}</p>
        <div className="flex justify-between text-sm text-gray-400 group-hover:text-white duration-300">
          <span>{dateFormat(date)}</span>
          <span>{word}字</span>
        </div>
      </div>
    </Link>
  )
}
