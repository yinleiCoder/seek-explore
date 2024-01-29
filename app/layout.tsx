import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import AppContextProvider from '@/context/appContext'
import ThemeProvider from '@/provider/ThemeProvider'
import Navbar from '@/components/navbar'
import { CommandMenu } from '@/components/command'
import BackTop from '@/components/top'
import ProgressBar from '@/components/progressbar'
import Footer from '@/components/footer'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '寻寻觅觅',
    template: '%s | 寻寻觅觅',
  },
  description: '行之力则知愈进，知之深则行愈达',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, 'bg-white dark:bg-zinc-900 duration-300')}>
        <ProgressBar />
        <SessionProvider session={session}>
          <AppContextProvider>
            <ThemeProvider>
              <Navbar />
              {children}
              <Footer />
              <Toaster />
              <CommandMenu />
            </ThemeProvider>
          </AppContextProvider>
        </SessionProvider>
        <BackTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
