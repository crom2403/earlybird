// import { AuroraBackgroundDemo } from "@/components/background/AuroraBackgroundDemo"
// import { GridBackgroundDemo } from "@/components/background/GridBackgroundDemo"
import { SpotlightPreview } from "@/components/background/SpotlightPreview"

export default function Home() {
  return (
    <div className="w-full relative">
      <div className="absolute top-0 flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <div className="w-[40rem] relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>
      </div>
      {/* <AuroraBackgroundDemo /> */}
      {/* <GridBackgroundDemo /> */}
      <SpotlightPreview />
      <div className="absolute inset-0 h-[calc(100vh-64px)]"></div>
    </div>
  )
}
