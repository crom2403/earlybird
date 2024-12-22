/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
// import { OnlineStatus } from "@/components/dashboard/OnlineStatus"
import React from "react"
import dynamic from "next/dynamic"

const CommitGrid = dynamic(() => import("./CommitGrid"), { ssr: false })

const DashBoard = ({ userId }: { userId: string | undefined }) => {
  return (
    <div>
      {/* <OnlineStatus userId={userId} /> */}
      <ShootingStars className="absolute inset-0 z-[-1]" />
      <StarsBackground className="absolute inset-0 z-[-2]" />
      <CommitGrid />
    </div>
  )
}

export default DashBoard
