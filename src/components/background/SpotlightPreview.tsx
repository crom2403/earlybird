import React from "react"
// import { Spotlight } from "../ui/spotlight"
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision"

export function SpotlightPreview() {
  return (
    <BackgroundBeamsWithCollision className="z-[5] md:h-[calc(100vh-64px)]">
      <div className="absolute inset-0 z-[-10] h-[calc(100vh-64px)] w-full flex md:items-center md:justify-center dark:bg-black/[0.96] antialiased dark:bg-grid-white/[0.02] bg-grid-black/[0.04] overflow-hidden">
        {/* <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" /> */}
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-neutral-700 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
            Learn <br />{" "}
            <span className="text relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
              Vocabulary
            </span>{" "}
            with my.
          </h1>
          <p className="mt-4 font-normal text-base text-neutral-800 dark:text-neutral-300 max-w-lg text-center mx-auto">
            If you are having difficulty learning vocabulary, you can try learning vocabulary
            through repetitive typing.
          </p>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}
