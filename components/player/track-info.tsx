"use client"

import Image from "next/image"
import { usePlayerContext } from "./player-context"

export function TrackInfo() {
  const { currentTrack } = usePlayerContext()

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative h-[270px] w-[270px] overflow-hidden rounded-full bg-background">
        {currentTrack?.front ? (
          <Image
            src={currentTrack.front}
            alt="Cover"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-muted-foreground">Cover</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 mt-6">
        <h1 className="text-xl font-semibold text-foreground">
          {currentTrack?.title || "Sin selección"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentTrack?.artist || "Artista"}
        </p>
        <p className="text-xs text-muted-foreground/70 transition-opacity duration-500 ease-in-out mt-4">
          {currentTrack?.dedicatoria || ""}
        </p>
      </div>
    </div>
  )
}
