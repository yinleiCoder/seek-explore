'use client'

import { useEffect } from 'react'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAudio } from '@/hooks/useAudio'
import Button from '../button'
import styles from './index.module.css'

function AudioPlayer({ track }: { track: string }) {
  const searchParams = useSearchParams()
  const timeJump = searchParams.get('t')

  const {
    isPlaying,
    duration,
    currentTime,
    audioPlayer,
    progressBar,
    calculateTime,
    togglePlayState,
    changeRange,
    backFive,
    forwardFive,
    onLoadedMetadata,
  } = useAudio()

  useEffect(() => {
    if (!progressBar.current) {
      return
    }
    if (timeJump && Number(timeJump) > 0) {
      progressBar.current.value = timeJump
    } else {
      progressBar.current.value = String(0)
    }
    changeRange()
  }, [timeJump])

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioPlayer} src={track} preload="metadata" onLoadedMetadata={onLoadedMetadata} />
      <section className="flex items-center">
        <Button
          icon={BsArrowLeftShort}
          className=""
          iconClassName="hover:text-indigo-500"
          onClick={backFive}
        >
          5
        </Button>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Button
            icon={isPlaying ? FaPause : FaPlay}
            onClick={togglePlayState}
            className="bg-indigo-500 text-white rounded-full p-3 flex items-center justify-center mx-3 shadow-md shadow-indigo-500"
          />
        </motion.div>
        <Button
          icon={BsArrowRightShort}
          className="flex flex-row-reverse"
          iconClassName="hover:text-indigo-500"
          onClick={forwardFive}
        >
          5
        </Button>
      </section>
      <section>
        <div className="border border-indigo-500 rounded-md py-[2px] px-1 text-sm cursor-pointer">
          诀别书
        </div>
      </section>
      <section className="flex-1 flex items-center gap-2">
        <span>{calculateTime(currentTime)}</span>
        <div className="flex-1 flex items-center">
          <input
            ref={progressBar}
            type="range"
            className={styles.progressBar}
            defaultValue={0}
            onChange={changeRange}
          />
        </div>
        <span>{duration && !isNaN(duration) && calculateTime(duration)}</span>
      </section>
    </div>
  )
}

export { AudioPlayer }
