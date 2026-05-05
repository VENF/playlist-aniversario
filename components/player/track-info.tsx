"use client"

import { AnimatePresence, motion } from "motion/react"
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
    <div className="group relative my-[20px] flex flex-col items-center gap-4 text-center z-2">
      {currentTrack?.front && (
        <motion.div
          className="absolute top-[10px] z-0 h-[200px] w-[200px] overflow-hidden rounded-full opacity-70 blur-[30px] dark:opacity-30 dark:blur-[15px] [@media(max-height:668px)]:h-[180px] [@media(max-height:668px)]:w-[180px]"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: currentTrack.colors?.primary || "#000" }}
          />


          <Image
            src={currentTrack.front}
            alt=""
            fill
            className="rounded-full object-cover"
            unoptimized
            priority
          />
        </motion.div>
      )}

      <motion.div
        className="relative z-10 h-[200px] w-[200px] overflow-hidden rounded-full border-2 shadow-inner [@media(max-height:668px)]:h-[180px] [@media(max-height:668px)]:w-[180px]"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
        style={{ transformOrigin: "center center" }}
      >
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-white via-gray-100 to-gray-300 shadow-lg [@media(min-height:669px)]:h-10 [@media(min-height:669px)]:w-10">
            <div className="h-1.5 w-1.5 rounded-full bg-black/80 [@media(min-height:669px)]:h-2 [@media(min-height:669px)]:w-2" />
          </div>
        </div>

        <Image
          src={currentTrack.front}
          alt={currentTrack.title}
          fill
          className="rounded-full object-cover"
          unoptimized
          priority
        />
      </motion.div>
    </div>
  )
}

export function TrackInfo() {
  const { currentTrack, isPlaying } = usePlayerContext()

  return (
    <div className="z-2 flex flex-col items-center gap-4 text-center">
      <DynamicShadowDisc isPlaying={isPlaying} currentTrack={currentTrack} />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">
          {currentTrack?.title || "Sin selección"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {currentTrack?.artist || "Artista"}
        </p>
        <div className="mt-4 flex min-h-[60px] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTrack?.title} // Se reinicia al cambiar de track
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="px-4 text-[13px] leading-relaxed font-light text-muted-foreground/80 italic"
            >
              {currentTrack?.dedicatoria ? `"${currentTrack.dedicatoria}"` : ""}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
