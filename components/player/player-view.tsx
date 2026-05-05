"use client"

import { LiveWaveform } from "@/components/ui/live-waveform"
import { ThemeSwitcher } from "@/components/theme-swticher"
import { usePlayerContext } from "./player-context"
import { PlayerControls } from "./player-controls"
import { TrackInfo } from "./track-info"
import { motion } from "motion/react"

function DynamicBackground({
  color,
  secondary,
}: {
  color?: string
  secondary?: string
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden">
      <motion.div
        animate={{
          backgroundColor: color || "var(--primary)",
          y: [0, 15, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          backgroundColor: { duration: 2, ease: "easeInOut" },
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-16 left-1/2 h-44 w-64 -translate-x-1/3 rounded-full opacity-40 blur-[70px]"
        style={{
          willChange: "transform, background-color",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        animate={{
          backgroundColor: secondary || color || "var(--primary)",
          y: [0, -20, 0],
          x: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          backgroundColor: { duration: 2, ease: "easeInOut" },
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -bottom-16 left-1/2 h-44 w-64 -translate-x-1/1 rounded-full opacity-30 blur-[80px]"
        style={{
          willChange: "transform, background-color",
          transform: "translateZ(0)",
        }}
      />
    </div>
  )
}
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PlayerView() {
  const { isPlaying, progress, duration, seek, currentTime, currentTrack } =
    usePlayerContext()

  const handleSeek = (percent: number) => {
    if (duration > 0) {
      seek((percent / 100) * duration)
    }
  }

  return (
    <div className="relativeflex min-h-dvh flex-col justify-between px-5 py-4">
      <DynamicBackground
        color={currentTrack?.colors.primary}
        secondary={currentTrack?.colors.secondary}
      />
      <div className="z-2 flex items-center justify-end">
        <ThemeSwitcher />
      </div>
      <header className="z-2 flex flex-col items-center justify-center">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
          Playlist: Porqué
        </h2>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-5">
        <TrackInfo />
        <div className="z-2 flex w-full max-w-[320px] flex-col gap-2">
          <LiveWaveform
            processing={isPlaying}
            active={false}
            height={64}
            barWidth={3}
            barGap={1}
            barRadius={1.5}
            mode="static"
            progress={progress}
            playedColor="#000000"
            unplayedColor="#9ca3af"
            onSeek={handleSeek}
          />
          <div className="relative top-[-22px] flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 255)}</span>
          </div>
        </div>
        <PlayerControls />
      </main>
    </div>
  )
}
