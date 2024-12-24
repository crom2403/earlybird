/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
// import { OnlineStatus } from "@/components/dashboard/OnlineStatus"
import React, { useEffect } from "react"
import dynamic from "next/dynamic"
import Snowfall from "react-snowfall"
import TimeLearning from "@/components/dashboard/TimeLearning"

const CommitGrid = dynamic(() => import("./CommitGrid"), { ssr: false })

interface DashBoardProps {
  userId: string | undefined
  listStudyTime: {
    date: string
    totalTime: number
  }[]
}

const DashBoard = ({ userId, listStudyTime }: DashBoardProps) => {
  // const handleGetData = async () => {
  //   console.log("userId", userId)
  //   const res = await getAllStudyTimeByUser(userId || "")
  //   console.log(res)
  // }
  // useEffect(() => {
  //   handleGetData()
  // }, [])

  console.log(listStudyTime)
  return (
    <div className="relative overflow-x-hidden overflow-y-auto">
      <div className="absolute top-[-130px] right-[-130px] size-72 duration-400 ease-linear transition-all bg-gradient-to-r from-blue-400 to-pink-600 dark:from-yellow-200 dark:to-red-500 transform scale-[1.80] rounded-full blur-3xl " />
      <div className="p-4">
        <Snowfall snowflakeCount={20} />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative overflow-hidden w-full md:min-w-[520px] md:h-[260px] rounded-2xl">
            <video
              className="absolute h-full w-full object-cover"
              autoPlay
              loop
              muted
              preload="auto"
            >
              <source src="/assets/lofi_christmas.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="min-w-[340px]">
            <TimeLearning />
          </div>
          <div className="w-full shadow-xl bg-transparent border border-gray-800 rounded-2xl"></div>
        </div>
        {/* <OnlineStatus userId={userId} /> */}
        <ShootingStars className="absolute inset-0 z-[-1]" />
        <StarsBackground className="absolute inset-0 z-[-2]" />
        <CommitGrid listStudyTime={listStudyTime || []} />
      </div>
    </div>
  )
}

export default DashBoard
