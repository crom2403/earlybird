"use client"

import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
import Snowfall from "react-snowfall"

const BackgroundUniverse = () => {
  return (
    <div>
      <Snowfall snowflakeCount={20} />
      <ShootingStars className="absolute inset-0 z-[-1]" />
      <StarsBackground className="absolute inset-0 z-[-2]" />
    </div>
  )
}

export default BackgroundUniverse
