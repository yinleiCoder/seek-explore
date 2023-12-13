'use client'

import { useAppContext } from '@/context/appContext'
import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const {
    state: { themeMode },
  } = useAppContext()

  useEffect(() => {
    document.querySelector('html')!.className = themeMode
  }, [themeMode])

  return <>{children}</>
}
