// import { AuroraBackgroundDemo } from "@/components/background/AuroraBackgroundDemo"
// import { GridBackgroundDemo } from "@/components/background/GridBackgroundDemo"
import { SpotlightPreview } from "@/components/background/SpotlightPreview"
import LineColor from "@/components/ui/LineColor"

export default function Home() {
  return (
    <div className="w-full relative">
      <LineColor />
      {/* <AuroraBackgroundDemo /> */}
      <SpotlightPreview />
    </div>
  )
}
