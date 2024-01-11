import { useState, useRef, useEffect, useCallback } from 'react'

const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const audioPlayer = useRef<HTMLAudioElement>(null)
  const progressBar = useRef<HTMLInputElement>(null)
  const animationRef = useRef(0)

  const calculateTime = (duration: number) => {
    const minutes = Math.floor(duration / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(duration % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const whilePlaying = () => {
    if (!audioPlayer.current) {
      return
    }
    if (!progressBar.current) {
      return
    }
    progressBar.current.value = audioPlayer.current.currentTime.toString()
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(parseFloat(progressBar.current.value) / duration) * 100}%`
    )
    setCurrentTime(parseFloat(progressBar.current.value))
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const play = () => {
    audioPlayer.current?.play()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = () => {
    if (!audioPlayer.current) {
      return
    }
    if (!progressBar.current) {
      return
    }
    audioPlayer.current.currentTime = parseFloat(progressBar.current.value)
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(parseFloat(progressBar.current.value) / duration) * 100}%`
    )
    setCurrentTime(parseFloat(progressBar.current.value))
  }

  const togglePlayState = () => {
    const preValue = isPlaying
    setIsPlaying(!preValue)
    if (!preValue) {
      play()
    } else {
      audioPlayer.current?.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const backFive = () => {
    if (!progressBar.current) {
      return
    }
    progressBar.current.value = (Number(progressBar.current.value) - 5).toString()
    changeRange()
  }

  const forwardFive = () => {
    if (!progressBar.current) {
      return
    }
    progressBar.current.value = (Number(progressBar.current.value) + 5).toString()
    changeRange()
  }

  const onLoadedMetadata = useCallback(() => {
    const seconds = Math.floor(audioPlayer.current!.duration)
    setDuration(seconds)
    progressBar.current!.max = seconds.toString()
  }, [])

  useEffect(() => {
    if (!audioPlayer.current) {
      return
    }
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    if (!progressBar.current) {
      return
    }
    progressBar.current.max = seconds.toString()
  }, [audioPlayer.current?.readyState])

  useEffect(() => {
    if (duration > 0 && currentTime === duration) {
      progressBar.current!.value = String(0)
      changeRange()
      togglePlayState()
    }
  }, [currentTime, duration])

  return {
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
    setDuration,
    onLoadedMetadata,
  }
}

export { useAudio }
