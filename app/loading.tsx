'use client'

import PacmanLoader from 'react-spinners/PacmanLoader'

export default function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <PacmanLoader loading color="#36d7b7" />
    </div>
  )
}
