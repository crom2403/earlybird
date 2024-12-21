import { BorderBeam } from "@/components/ui/border-beam"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/utils"
import Link from "next/link"
import React, { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

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
  const popupRef = useRef<HTMLDivElement>(null) // Tạo ref để tham chiếu đến popup

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

      // Lấy kích thước và vị trí của popup
      const popup = popupRef.current
      if (popup) {
        const { left, top, width, height } = popup.getBoundingClientRect()

        // Tính toán vị trí gốc cho confetti
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

    return () => clearInterval(interval) // Dọn dẹp interval khi component unmount
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={popupRef} // Gán ref cho popup
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative max-w-[600px] flex h-[400px] w-full flex-col items-center p-4 overflow-hidden rounded-lg border md:shadow-xl"
      >
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          Kết quả học tập
        </span>
        <div className="space-y-4">
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
        <div className="flex gap-2 mt-4">
          <Button onClick={resetLearning}>Học lại</Button>
          <Link href="/vocabulary">
            <Button variant="outline">Trở về</Button>
          </Link>
        </div>
        <BorderBeam size={250} duration={6} delay={30} />
      </div>
    </div>
  )
}

export default PopupFinalLearn
