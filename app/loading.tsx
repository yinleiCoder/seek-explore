import Skeleton from 'react-loading-skeleton'

export default function Loading() {
  return (
    <div className="p-2">
      <Skeleton count={30} />
    </div>
  )
}
