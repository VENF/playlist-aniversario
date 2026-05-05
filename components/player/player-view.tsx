"use client"

import { LiveWaveform } from "@/components/ui/live-waveform"
import { ThemeSwitcher } from "@/components/theme-swticher"
import { usePlayerContext } from "./player-context"
import { PlayerControls } from "./player-controls"
import { TrackInfo } from "./track-info"

/**
        <p className="text-[10px] text-muted-foreground text-center mt-2 max-w-[400px]">
          Generalmente, considero que no se me dan muy bien las palabras y no sé
          cómo expresar genuinamente lo que siento. Esta playlist existe por esa
          razón y su propósito es claro: responder a la pregunta “¿por qué me
          enamoré de ti?”. Creo que cuando las palabras están de más, el alma
          entiende mejor.
        </p>
 */

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PlayerView() {
  const { isPlaying, progress, duration, seek, currentTime } =
    usePlayerContext()

  const handleSeek = (percent: number) => {
    if (duration > 0) {
      seek((percent / 100) * duration)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col justify-between px-5 py-6">
      <div className="flex items-center justify-end">
        <ThemeSwitcher />
      </div>
      <header className="flex flex-col items-center justify-center">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase">
          Playlist: Porqué
        </h2>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        <TrackInfo />
        <div className="flex w-full max-w-[320px] flex-col gap-2">
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
