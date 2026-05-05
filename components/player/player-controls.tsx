"use client"

import { Pause, Play, SkipBack, SkipForward } from "lucide-react"

import { usePlayerContext } from "./player-context"

export function PlayerControls() {
  const { isPlaying, toggle, prev, next } = usePlayerContext()

  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={prev}
        className="flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Anterior"
      >
        <SkipBack className="h-6 w-6" />
      </button>

      <button
        onClick={toggle}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? (
          <Pause className="h-8 w-8" />
        ) : (
          <Play className="h-8 w-8 pl-1" />
        )}
      </button>

      <button
        onClick={next}
        className="flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Siguiente"
      >
        <SkipForward className="h-6 w-6" />
      </button>
    </div>
  )
}