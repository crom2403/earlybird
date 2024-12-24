/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"
// import { OnlineStatus } from "@/components/dashboard/OnlineStatus"
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
  todayTimeStudy: number
  monthTimeStudy: number
}

const DashBoard = ({ userId, listStudyTime, todayTimeStudy, monthTimeStudy }: DashBoardProps) => {
  console.log(listStudyTime)
  return (
    <div className="relative overflow-x-hidden overflow-y-auto">
      <Snowfall snowflakeCount={20} />
      <div className="absolute top-[-130px] right-[-130px] size-72 duration-400 ease-linear transition-all bg-gradient-to-r from-white to-white dark:from-yellow-200 dark:to-red-500 transform scale-[1.80] rounded-full blur-3xl " />
      <div className="p-4 w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[40%] flex flex-col gap-4">
          <div className="relative overflow-hidden w-full md:h-[260px] h-[200px] rounded-2xl">
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
          <div className="md:hidden w-full md:w-[60%] flex flex-col md:flex-row gap-4">
            <TimeLearning data={{ todayTimeStudy, monthTimeStudy }} />
            <div className="w-full bg-transparent"></div>
          </div>
          <div className="w-full">
            <CommitGrid listStudyTime={listStudyTime || []} />
          </div>
        </div>

        <div className="hidden w-full md:w-[60%] md:flex flex-col md:flex-row gap-4">
          <TimeLearning data={{ todayTimeStudy, monthTimeStudy }} />
          <div className="w-full bg-transparent"></div>
        </div>
        {/* <OnlineStatus userId={userId} /> */}
        <ShootingStars className="absolute inset-0 z-[-1]" />
        <StarsBackground className="absolute inset-0 z-[-2]" />
      </div>
    </div>
  )
}

export default DashBoard
