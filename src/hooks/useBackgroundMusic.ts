import { useEffect, useRef, useState } from 'react'
import backgroundTrack from '../assets/music/bgmusic.mp3'

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio(backgroundTrack)
    audio.autoplay = true
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.4
    audioRef.current = audio

    const removeInteractionListeners = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction, true)
      window.removeEventListener('touchend', handleFirstInteraction, true)
      window.removeEventListener('keydown', handleFirstInteraction, true)
    }
    const handlePlay = () => {
      setIsPlaying(true)
      removeInteractionListeners()
    }
    const handlePause = () => setIsPlaying(false)
    const tryPlay = () => {
      void audio.play().catch(() => setIsPlaying(false))
    }
    const handleFirstInteraction = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('[data-music-toggle]')
      ) {
        return
      }

      tryPlay()
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    void audio.play().catch(() => setIsPlaying(false))
    window.addEventListener('pointerdown', handleFirstInteraction, true)
    window.addEventListener('touchend', handleFirstInteraction, true)
    window.addEventListener('keydown', handleFirstInteraction, true)

    return () => {
      removeInteractionListeners()
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }

  return { isPlaying, toggle }
}
