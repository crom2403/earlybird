// import { Meteors } from "@/components/ui/meteors"
import { convertSecondsToHoursMinutes } from "@/utils/converter"
import Image from "next/image"
import React from "react"

interface TimeLearningProps {
  data: {
    todayTimeStudy: number
    monthTimeStudy: number
  }
}

const TimeLearning = ({ data }: TimeLearningProps) => {
  return (
    <div className="w-full relative h-[240px]">
      <Image
        src="/svg/caythong.svg"
        width={140}
        height={100}
        alt="cay thong"
        className="absolute right-0 bottom-0"
      />
      <div className="absolute inset-0 shadow-lg dark:shadow-2xl bg-transparent  h-full overflow-hidden rounded-2xl">
        {/* <Meteors number={20} /> */}
        <div className="flex flex-col gap-4 p-4">
          <p className="text-2xl dark:text-white mt-2 font-semibold">My process</p>
          <div className="flex gap-4 text-lg">
            <div>
              <p>Today</p>
              <p className="text-sm font-semibold mt-1 text-yellow-400">
                {convertSecondsToHoursMinutes(data.todayTimeStudy)}
              </p>
            </div>
            <div>
              <p>This Month</p>
              <p className="text-sm font-semibold mt-1 text-yellow-400">
                {convertSecondsToHoursMinutes(data.monthTimeStudy)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLearning
