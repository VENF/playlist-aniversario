"use client"

import { LiveWaveform } from "@/components/ui/live-waveform"
import { ThemeSwitcher } from "@/components/theme-swticher"
import { usePlayerContext } from "./player-context"
import { PlayerControls } from "./player-controls"
import { TrackInfo } from "./track-info"
import { motion } from "motion/react"

/**
        <p className="text-[10px] text-muted-foreground text-center mt-2 max-w-[400px]">
          Generalmente, considero que no se me dan muy bien las palabras y no sé
          cómo expresar genuinamente lo que siento. Esta playlist existe por esa
          razón y su propósito es claro: responder a la pregunta “¿por qué me
          enamoré de ti?”. Creo que cuando las palabras están de más, el alma
          entiende mejor.
        </p>
 */

function DynamicBackground({ color, secondary }: { color?: string; secondary?: string }) {
  return (
    <div className="fixed inset-0 z-1 bg-background overflow-hidden">
      <motion.div
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 50% 60% 40% 60%",
            "40% 60% 70% 30% / 40% 50% 60% 50%",
          ],
  
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[400px] -right-40 h-[600px] w-[600px] blur-[100px] opacity-[0.25]"
        style={{ backgroundColor: color || "var(--primary)" }}
      />

      <motion.div
        animate={{
          borderRadius: [
            "50% 50% 30% 70% / 50% 30% 70% 50%",
            "30% 70% 50% 50% / 70% 50% 30% 50%",
            "50% 50% 30% 70% / 50% 30% 70% 50%",
          ],
          x: [0, -60, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-[600px] -left-40 h-[700px] w-[700px] blur-[120px] opacity-[0.15]"
        style={{ backgroundColor: secondary || "var(--primary)" }}
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
    <div className="flex min-h-dvh flex-col justify-between px-5 py-6">
      <div className="flex items-center justify-end z-2">
        <ThemeSwitcher />
      </div>
      <header className="flex flex-col items-center justify-center z-2">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
          Playlist: Porqué
        </h2>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        <TrackInfo />
        <DynamicBackground color={currentTrack?.colors.primary} secondary={currentTrack?.colors.secondary} />
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
