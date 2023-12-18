import Skeleton from 'react-loading-skeleton'

export default function NewsPage() {
  return (
    <div>
      <Skeleton count={10} className="dark:text-red-300 dark:bg-zinc-800" containerClassName="" />
    </div>
  )
}
