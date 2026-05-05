"use client"

import { PlayerProvider } from "@/components/player/player-context"
import { PlayerView } from "@/components/player/player-view"

export default function Page() {
  return (
    <PlayerProvider>
      <div className="mx-auto flex min-h-dvh max-w-[400px] flex-col bg-background">
        <PlayerView />
      </div>
    </PlayerProvider>
  )
}