"use client"

import { usePlayerContext } from "./player-context"

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function ProgressBar() {
  const { currentTime, duration, seek, isPlaying } = usePlayerContext()

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration || 255)}</span>
      </div>

      <div
        className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-muted"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={duration || 100}
        aria-valuenow={currentTime}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const percent = (e.clientX - rect.left) / rect.width
          if (duration > 0) {
            seek(percent * duration)
          }
        }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}