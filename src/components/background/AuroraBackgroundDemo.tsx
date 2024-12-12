"use client"
import { motion } from "framer-motion"
import React from "react"
import { AuroraBackground } from "../ui/aurora-background"

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground className="absolute inset-0 z-[-10] h-[calc(100vh-64px)] bg-slate-900">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex flex-col gap-4 items-center justify-center px-4"
      ></motion.div>
    </AuroraBackground>
  )
}
