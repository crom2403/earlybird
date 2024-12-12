import React from "react"

export function GridBackgroundDemo() {
  return (
    <div className="absolute inset-0 z-[-10] h-[calc(100vh-64px)] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
    </div>
  )
}
