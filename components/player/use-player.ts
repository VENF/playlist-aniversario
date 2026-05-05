"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface Track {
  id: string
  title: string
  artist: string
  src: string
  front: string
  dedicatoria: string
  duration?: number
}

export interface UsePlayerReturn {
  isPlaying: boolean
  currentTime: number
  duration: number
  progress: number
  currentTrack: Track | null
  play: () => void
  pause: () => void
  toggle: () => void
  seek: (time: number) => void
  next: () => void
  prev: () => void
  playTrack: (track: Track) => void
}

const PLAYLIST: Track[] = [
  {
    id: "1",
    title: "Isla Morenita",
    artist: "Carlos Sadness",
    src: "/assets/Jósean Log - Hora de Comer.mp3",
    front: "/assets/front/isla-morenita.png",
    dedicatoria: "Porque estar contigo se siente como estar en una isla sin mal tiempo:",
  },
  {
    id: "2",
    title: "Hora de Comer",
    artist: "Jósean Log",
    src: "/assets/Jósean Log - Hora de Comer.mp3",
    front: "/assets/front/isla-morenita",
    dedicatoria: "Para ti, con amor",
  },
  {
    id: "3",
    title: "Hora de Comer",
    artist: "Jósean Log",
    src: "/assets/Jósean Log - Hora de Comer.mp3",
    front: "/assets/front/isla-morenita",
    dedicatoria: "Para ti, con amor",
  },
  {
    id: "4",
    title: "Hora de Comer",
    artist: "Jósean Log",
    src: "/assets/Jósean Log - Hora de Comer.mp3",
    front: "/assets/front/isla-morenita",
    dedicatoria: "Para ti, con amor",
  },
  {
    id: "5",
    title: "Hora de Comer",
    artist: "Jósean Log",
    src: "/assets/Jósean Log - Hora de Comer.mp3",
    front: "/assets/front/isla-morenita",
    dedicatoria: "Para ti, con amor",
  },
]

export const PLAYLIST_DATA = PLAYLIST

export function usePlayer(): UsePlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(PLAYLIST[0])

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }, [])

  const play = useCallback(() => {
    audioRef.current?.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {})
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const next = useCallback(() => {
    if (!currentTrack) return
    const currentIndex = PLAYLIST.findIndex(t => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % PLAYLIST.length
    const nextTrack = PLAYLIST[nextIndex]
    setCurrentTrack(nextTrack)
  }, [currentTrack])

  const prev = useCallback(() => {
    if (!currentTrack) return
    const currentIndex = PLAYLIST.findIndex(t => t.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    const prevTrack = PLAYLIST[prevIndex]
    setCurrentTrack(prevTrack)
  }, [currentTrack])

  const playTrack = useCallback((track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
      audioRef.current.load()
    }

    const audio = new Audio(track.src)
    audio.preload = "metadata"
    audioRef.current = audio

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateTime)
    audio.addEventListener("ended", () => {
      next()
    })
    audio.addEventListener("play", () => setIsPlaying(true))
    audio.addEventListener("pause", () => setIsPlaying(false))

    setCurrentTrack(track)
    play()
  }, [updateTime, next, play])

  useEffect(() => {
    if (!audioRef.current && currentTrack) {
      const audio = new Audio(currentTrack.src)
      audio.preload = "metadata"
      audioRef.current = audio

      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("loadedmetadata", updateTime)
      audio.addEventListener("ended", () => {
        next()
      })
      audio.addEventListener("play", () => setIsPlaying(true))
      audio.addEventListener("pause", () => setIsPlaying(false))
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
        audioRef.current.load()
      }
    }
  }, [])

  useEffect(() => {
    if (currentTrack && audioRef.current && audioRef.current.src !== currentTrack.src) {
      audioRef.current.src = currentTrack.src
      audioRef.current.load()
      if (isPlaying) {
        play()
      }
    }
  }, [currentTrack])

  return {
    isPlaying,
    currentTime,
    duration,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
    currentTrack,
    play,
    pause,
    toggle,
    seek,
    next,
    prev,
    playTrack,
  }
}