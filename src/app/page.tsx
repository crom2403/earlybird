// import { AuroraBackgroundDemo } from "@/components/background/AuroraBackgroundDemo"
// import { GridBackgroundDemo } from "@/components/background/GridBackgroundDemo"
import { SpotlightPreview } from "@/components/background/SpotlightPreview"
import GoogleLoginButton from "@/components/login/GoogleLoginButton"

export default function Home() {
  return (
    <div className="w-full relative">
      {/* <AuroraBackgroundDemo /> */}
      {/* <GridBackgroundDemo /> */}
      <SpotlightPreview />
      <div className="absolute inset-0 h-[calc(100vh-64px)]">
        <GoogleLoginButton />
      </div>
    </div>
  )
}
