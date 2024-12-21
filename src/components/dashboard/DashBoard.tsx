import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
import React from "react"
import dynamic from "next/dynamic"

const CommitGrid = dynamic(() => import("./CommitGrid"), { ssr: false })

const DashBoard = () => {
  return (
    <div>
      <ShootingStars className="absolute inset-0 z-[-1]" />
      <StarsBackground className="absolute inset-0 z-[-2]" />
      <CommitGrid />
    </div>
  )
}

export default DashBoard
