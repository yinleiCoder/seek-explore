import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import Navbar from '@/components/navbar'
import AppContextProvider from '@/context/appContext'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import ThemeProvider from '@/provider/ThemeProvider'
import BackTop from '@/components/top'
import ProgressBar from '@/components/progressbar'
import Footer from '@/components/footer'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { CommandMenu } from '@/components/command'

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
              <div className="w-full duration-300 min-h-screen flex flex-col">
                <Navbar />
                {children}
                <Footer />
              </div>
              <CommandMenu />
              <Toaster />
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
