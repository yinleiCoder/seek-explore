'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 上传错误信息到sentry error reporting service platform
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div>
          <h2>出错啦！UI待做</h2>
          <button onClick={() => reset()}>重试</button>
        </div>
      </body>
    </html>
  )
}
