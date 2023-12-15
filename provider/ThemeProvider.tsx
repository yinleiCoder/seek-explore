'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'

// next-theme库解决theme存储、多标签页同步、刷新网页闪烁等问题
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider enableSystem={false} attribute="class">
      {children}
    </NextThemeProvider>
  )
}
