import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import clsx from 'clsx'
import Navbar from '@/components/navbar'
import AppContextProvider from '@/context/appContext'
import ThemeProvider from '@/provider/ThemeProvider'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '寻寻觅觅',
  description: '行之力则知愈进，知之深则行愈达',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          'bg-[rgba(255,246,223,0.5)] dark:bg-zinc-900 duration-300'
        )}
      >
        <AppContextProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </AppContextProvider>
      </body>
    </html>
  )
}
