// import { Meteors } from "@/components/ui/meteors"
import Image from "next/image"
import React from "react"

const TimeLearning = () => {
  return (
    <div className="w-full h-full relative">
      <Image
        src="/svg/caythong.svg"
        width={140}
        height={100}
        alt="cay thong"
        className="absolute right-0 bottom-0"
      />
      <div className="absolute inset-0 shadow-xl bg-transparent border border-gray-800 h-full overflow-hidden rounded-2xl">
        {/* <Meteors number={20} /> */}
        <div className="flex flex-col gap-4 p-4">
          <p className="text-2xl dark:text-white mt-2 font-semibold">My process</p>
          <div className="flex gap-4 text-lg">
            <div>
              <p>Today</p>
              <p className="text-sm font-semibold mt-1 text-yellow-400">1 giờ 23p</p>
            </div>
            <div>
              <p>This Month</p>
              <p className="text-sm font-semibold mt-1 text-yellow-400">17 hours 37p</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLearning
