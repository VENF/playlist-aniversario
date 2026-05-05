"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { usePlayerContext } from "./player-context"

const DynamicShadowDisc = ({
  isPlaying,
  currentTrack,
}: {
  isPlaying: boolean
  currentTrack: any
}) => {
  return (
    <div className="group relative flex flex-col items-center gap-4 text-center my-[20px]">
      {currentTrack?.front && (
        <motion.div
          className="absolute top-[10px] -inset-2 z-0 rounded-full opacity-70 blur-[30px] dark:blur-[10px] dark:opacity-30"
          custom={isPlaying}
          animate={{
            rotate: isPlaying ? 360 : 0,
            transition: {
              duration: isPlaying ? 15 : 0,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          aria-hidden="true"
        >
          <Image
            src={currentTrack.front}
            alt=""
            fill
            className="rounded-full object-cover"
            unoptimized
          />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 h-[270px] w-[270px] overflow-hidden rounded-full border-2 shadow-inner"
        custom={isPlaying}
        animate={{
          rotate: isPlaying ? 360 : 0,
          transition: {
            duration: isPlaying ? 15 : 0,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ transformOrigin: "center center" }}
      >
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-white via-gray-100 to-gray-300 shadow-lg">
            <div className="h-2 w-2 rounded-full" />
          </div>
        </div>

        {currentTrack?.front ? (
          <Image
            src={currentTrack.front}
            alt={`Cover de ${currentTrack.title}`}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm text-muted-foreground">Cover</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export function TrackInfo() {
  const { currentTrack, isPlaying } = usePlayerContext()

  const dedicatoria = currentTrack?.dedicatoria || ""

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <DynamicShadowDisc isPlaying={isPlaying} currentTrack={currentTrack} />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">
          {currentTrack?.title || "Sin selección"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentTrack?.artist || "Artista"}
        </p>
        <p className="mt-4 overflow-hidden text-xs text-muted-foreground/70 min-h-[35px]">
          {dedicatoria}
        </p>
      </div>
    </div>
  )
}
