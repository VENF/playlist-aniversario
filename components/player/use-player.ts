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
  colors: {
    primary: string
    secondary: string
  }
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
    src: "/assets/Carlos Sadness - Isla Morenita.mp3",
    front: "/assets/front/isla-morenita.png",
    dedicatoria:
      "Porque estar contigo se siente como estar en una isla sin mal tiempo:",
    colors: {
      primary: "#f59e0b",
      secondary: "#d97706",
    },
  },
  {
    id: "2",
    title: "Soñé Contigo",
    artist: "Carlos Sadness, Marco Mares",
    src: "/assets/Carlos Sadness, Marco Mares - Soñé Contigo.mp3",
    front: "/assets/front/sone-contigo.png",
    dedicatoria: "Por cada día que he soñado contigo, incluso despierto:",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
    },
  },
  {
    id: "3",
    title: "Celeste",
    artist: "Carlos Sadness, Nicco",
    src: "/assets/Carlos Sadness - Celeste ft. Nicco.mp3",
    front: "/assets/front/celeste.png",
    dedicatoria: "Porque nunca había visto algo tan infinitamente humano:",
    colors: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
    },
  },
  {
    id: "4",
    title: "Pruébame a Ti",
    artist: "Jósean Log",
    src: "/assets/Jósean Log - Pruébame a Ti (video oficial).mp3",
    front: "/assets/front/alma-due.png",
    dedicatoria: "Porque cuando todo se desborda, todo es mejor junto a ti:",
    colors: {
      primary: "#f43f5e",
      secondary: "#e11d48",
    },
  },
  {
    id: "5",
    title: "Hora de Comer",
    artist: "Jósean Log",
    src: "/assets/Jósean Log - Hora de Comer.mp3",
    front: "/assets/front/hora-de-comer.png",
    dedicatoria:
      "Porque cada día cotidiano junto a ti es como estar de vacaciones:",
    colors: {
      primary: "#3b82f6",
      secondary: "#2563eb",
    },
  },
  {
    id: "6",
    title: "Brillo Mío",
    artist: "Jósean Log",
    src: "/assets/Caloncho - Brillo Mío.mp3",
    front: "/assets/front/brillo.jpg",
    dedicatoria: "Porque descubrí que existe medicina para el alma:",
    colors: {
      primary: "#ec4899",
      secondary: "#db2777",
    },
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
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {})
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
    const currentIndex = PLAYLIST.findIndex((t) => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % PLAYLIST.length
    const nextTrack = PLAYLIST[nextIndex]
    setCurrentTrack(nextTrack)
  }, [currentTrack])

  const prev = useCallback(() => {
    if (!currentTrack) return
    const currentIndex = PLAYLIST.findIndex((t) => t.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    const prevTrack = PLAYLIST[prevIndex]
    setCurrentTrack(prevTrack)
  }, [currentTrack])

  const playTrack = useCallback(
    (track: Track) => {
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
    },
    [updateTime, next, play]
  )

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
    if (
      currentTrack &&
      audioRef.current &&
      audioRef.current.src !== currentTrack.src
    ) {
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
