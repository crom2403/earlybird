"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Input } from "@/components/ui/input"

// Circle component
const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div ref={ref} className={cn("z-10 flex shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]", className)}>
        {children}
      </div>
    )
  }
)

Circle.displayName = "Circle"

// DoubleInputVocabulary component
interface DoubleInputVocabularyProps {
  terminology: string
  define: string
  onChange: (field: "terminology" | "define", value: string) => void
}

export function DoubleInputVocabulary({
  terminology,
  define,
  onChange,
}: DoubleInputVocabularyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)

  return (
    <div className="relative flex w-full" ref={containerRef}>
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref} className="w-fit rounded-md p-0">
            <Input
              placeholder="Thuật ngữ"
              className="w-[250px] p-0 text-black border-none px-4 bg-white"
              value={terminology}
              onChange={(e) => onChange("terminology", e.target.value)}
            />
          </Circle>
          <Circle ref={div2Ref} className="w-fit rounded-md p-0">
            <Input
              placeholder="Định nghĩa"
              className="w-[250px] p-0 text-black border-none px-4 bg-white"
              value={define}
              onChange={(e) => onChange("define", e.target.value)}
            />
          </Circle>
        </div>
      </div>
      <AnimatedBeam duration={3} containerRef={containerRef} fromRef={div1Ref} toRef={div2Ref} />
    </div>
  )
}
