"use client"

import { LiveWaveform } from "@/components/ui/live-waveform"
import { ThemeSwitcher } from "@/components/theme-swticher"
import { usePlayerContext } from "./player-context"
import { PlayerControls } from "./player-controls"
import { TrackInfo } from "./track-info"
import { motion } from "motion/react"


function DynamicBackground({ color, secondary }: { color?: string; secondary?: string }) {
  return (
    <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
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
          ease: "easeInOut" 
        }}
    
        className="absolute -top-16 left-1/2 -translate-x-1/3 h-44 w-64 rounded-full blur-[70px] opacity-40"
        style={{ 
          willChange: "transform, background-color",
          transform: "translateZ(0)" 
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
          delay: 0.5 
        }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/1 h-44 w-64 rounded-full blur-[80px] opacity-30"
        style={{ 
          willChange: "transform, background-color",
          transform: "translateZ(0)"
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
              <DynamicBackground color={currentTrack?.colors.primary} secondary={currentTrack?.colors.secondary} />
      <div className="flex items-center justify-end z-2">
        <ThemeSwitcher />
      </div>
      <header className="flex flex-col items-center justify-center z-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
          Playlist: Porqué
        </h2>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-5">
        <TrackInfo />
        <div className="flex w-full max-w-[320px] flex-col gap-2 z-2">
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
          <div className="flex relative top-[-22px] items-center justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 255)}</span>
          </div>
        </div>
        <PlayerControls />
      </main>
    </div>
  )
}
