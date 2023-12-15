'use client'

import Button from '../button'
import { MdDarkMode } from 'react-icons/md'
import { IoSunnyOutline } from 'react-icons/io5'
import { THEME_DARK, THEME_LIGHT } from '@/constants/theme'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// 主题切换
export default function Theme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      icon={theme === THEME_DARK ? MdDarkMode : IoSunnyOutline}
      onClick={() => setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)}
    />
  )
}
