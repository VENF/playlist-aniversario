"use client"

import { createContext, useContext, type ReactNode } from "react"

import { usePlayer, type Track, type UsePlayerReturn } from "./use-player"

const PlayerContext = createContext<UsePlayerReturn | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const player = usePlayer()

  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  )
}

export function usePlayerContext() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayerContext must be used within PlayerProvider")
  }
  return context
}

export type { Track }