"use client"

import { LiveWaveform } from "@/components/ui/live-waveform"
import { ThemeSwitcher } from "@/components/theme-swticher"
import { usePlayerContext } from "./player-context"
import { PlayerControls } from "./player-controls"
import { ProgressBar } from "./progress-bar"
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

export function PlayerView() {
  const { isPlaying } = usePlayerContext()

  return (
    <div className="flex min-h-dvh flex-col justify-between py-6 px-4">
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
        <div className="w-full max-w-[320px]">
          <LiveWaveform
            processing={isPlaying}
            active={false}
            height={64}
            barWidth={3}
            barGap={1}
            barRadius={1.5}
            mode="static"
          />
        </div>

        <div className="w-full max-w-[320px]">
          <ProgressBar />
        </div>

        <PlayerControls />
      </main>
    </div>
  )
}
