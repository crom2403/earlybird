import LineColor from "@/components/ui/LineColor"
import React from "react"
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative">
        <LineColor />
      </div>
      {children}
    </div>
  )
}

export default layout
