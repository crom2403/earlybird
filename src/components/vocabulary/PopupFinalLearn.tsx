import { BorderBeam } from "@/components/ui/border-beam"
import { formatTime } from "@/lib/utils"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

export interface PopupFinalLearnProps {
  lengthListVocabulary: number
  mode: string
  correctAnswers: number
  wrongAnswers: number
  totalTime: number
  resetLearning: () => void
}

const PopupFinalLearn = ({
  lengthListVocabulary,
  mode,
  correctAnswers,
  wrongAnswers,
  totalTime,
  resetLearning,
}: PopupFinalLearnProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      const popup = popupRef.current

      if (popup) {
        const { left, top, width, height } = popup.getBoundingClientRect()
        confetti({
          ...defaults,
          particleCount,
          origin: {
            x: (left + randomInRange(0, width)) / window.innerWidth,
            y: (top + randomInRange(0, height)) / window.innerHeight,
          },
        })
      }
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-10 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-black relative md:max-w-[700px] h-[400px] w-full rounded-lg overflow-hidden">
        <div
          ref={popupRef}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-transparent z-[2] flex flex-col items-center p-4 overflow-hidden rounded-lg border md:shadow-xl"
        >
          <span className="mt-8 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Kết quả học tập
          </span>

          <div className="flex flex-col items-center mt-4 space-y-4 text-white z-[2]">
            <p>Tổng số từ: {lengthListVocabulary}</p>
            {mode === "test" && (
              <>
                <p>Số câu đúng: {correctAnswers}</p>
                <p>Số câu sai: {wrongAnswers}</p>
                <p>Tỷ lệ đúng: {((correctAnswers / lengthListVocabulary) * 100).toFixed(1)}%</p>
              </>
            )}
            <p>Thời gian hoàn thành: {formatTime(totalTime)}</p>
          </div>
          <div className="flex items-center gap-4 mt-4">
            {/* <Button onClick={resetLearning} className="px-4 py-2" variant="outline">
              Học lại
            </Button> */}
            <button
              onClick={resetLearning}
              className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Học lại
              </span>
            </button>
            <Link href="/vocabulary">
              <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
                <span className="absolute inset-0 overflow-hidden rounded-full">
                  <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                  <span>Trở về</span>
                  <svg
                    fill="none"
                    height="16"
                    viewBox="0 0 24 24"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 8.75L14.25 12L10.75 15.25"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
              </button>
            </Link>
          </div>

          <BorderBeam size={250} duration={6} delay={30} />
        </div>
        <ShootingStars className="absolute inset-0 z-[1]" />
        <StarsBackground className="absolute inset-0 z-[0]" />
      </div>
    </div>
  )
}

export default PopupFinalLearn
