import { getUsers } from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '时讯',
  description: '掌握天下事，观每日新闻',
}

export default async function NewsPage() {
  const users = await getUsers()
  console.log(users)
  return (
    <div>
      {users.map(user => (
        <div key={user._id}>{user.username}</div>
      ))}
    </div>
  )
}
