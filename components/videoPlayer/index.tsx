'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import videojs, { ReadyCallback } from 'video.js'
import type Player from 'video.js/dist/types/player'
import 'video.js/dist/video-js.css'
import './index.css'

export const VideoPlayer = ({ onReady }: { onReady?: ReadyCallback }) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)
  const videoJSOptions = useMemo(() => {
    return {
      autoplay: true,
      controls: true,
      responsive: true,
      preload: 'auto',
      //   fluid: true,
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.5, 2, 3],
      plugins: {},
      controlBar: {
        skipButtons: {
          backward: 5,
          forward: 5,
        },
      },
      sources: [
        {
          // src: '/videos/test1.mp4',
          src: '/videos/test.mp4',
          type: 'video/mp4',
        },
      ],
    }
  }, [])

  useEffect(() => {
    // make sure video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')
      videoRef.current?.appendChild(videoElement)
      const player = (playerRef.current = videojs(videoElement, videoJSOptions, () => {
        videojs.log('player is ready!')
        // onReady && onReady(player)
      }))
    } else {
      // update an existing player in here on prop change
      const player = playerRef.current
      player.autoplay(videoJSOptions.autoplay)
      player.src(videoJSOptions.sources)
    }
  }, [videoRef, videoJSOptions])

  useEffect(() => {
    const player = playerRef.current
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return <div className="w-full h-full" ref={videoRef} />
}
