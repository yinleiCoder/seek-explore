import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'
import Navbar from '@/components/navbar'
import AppContextProvider from '@/context/appContext'
import ThemeProvider from '@/provider/ThemeProvider'
import BackTop from '@/components/top'
import ProgressBar from '@/components/progressbar'
import Footer from '@/components/footer'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '寻寻觅觅',
  description: '行之力则知愈进，知之深则行愈达',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, 'bg-white dark:bg-zinc-900 duration-300')}>
        <ProgressBar />
        <AppContextProvider>
          <ThemeProvider>
            <div className="w-full duration-300 min-h-screen flex flex-col">
              <Navbar />
              {children}
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AppContextProvider>
        <BackTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
