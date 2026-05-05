"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"

const steps = [
  "Bienvenida a mi regalo de aniversario",
  "Generalmente, considero que no se me dan muy bien las palabras y no sé cómo expresar genuinamente lo que siento.",
  "Esta playlist existe por esa razón y su propósito es claro:",
  "responder a la pregunta \"¿por qué me enamoré de ti?\".",
  "Creo que cuando las palabras están de más, el alma entiende mejor.",
]

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      setIsNavigating(true)
      setTimeout(() => {
        router.push("/playlist")
      }, 600)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <div className="mx-auto flex h-dvh max-w-[340px] flex-col items-center justify-center bg-background px-4">
      <div className="relative w-full rounded-lg bg-card/50 p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="min-h-[40px] flex items-center justify-center"
          >
            <p className="text-center text-base leading-relaxed text-foreground">
              {steps[currentStep]}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex justify-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleNext}
            className="rounded-full border-none px-5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {isLastStep ? "Feliz aniversario Eileen 🌹" : "Siguiente"}
          </motion.button>
        </div>
      </div>

      <div className="mt-1 flex gap-1">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-colors ${
              index === currentStep ? "w-6 bg-foreground" : "w-1 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}