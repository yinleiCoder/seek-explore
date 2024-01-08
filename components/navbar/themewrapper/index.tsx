'use client'

import { useTheme } from 'next-themes'
import { Tooltip } from '@/components/tooltip'
import { THEME_DARK, THEME_LIGHT } from '@/constants/theme'

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  return (
    <>
      {children}
      <Tooltip
        anchorSelect="#theme-toggle"
        content={theme.theme}
        variant={theme.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK}
      />
    </>
  )
}

export default ThemeWrapper
