import { User } from '@/types/user'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export const useCurrentUser = () => {
  const session = useSession()
  const [user, setUser] = useState<User | null>({
    uid: '',
    name: '',
    email: '',
    image: '',
  })

  useEffect(() => {
    if (session.status === 'authenticated') {
      setUser({
        ...user,
        uid: session.data?.user?.id ?? '',
        name: session.data?.user?.name ?? '',
        email: session.data?.user?.email ?? '',
        image: session.data?.user?.image ?? '/images/userAvatar.png',
      })
    } else if (session.status === 'unauthenticated') {
      setUser(null)
    }
    return () => {
      setUser(null)
    }
  }, [session.status])

  return user
}
