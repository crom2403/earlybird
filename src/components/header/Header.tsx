import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BellRing } from "lucide-react"
import Image from "next/image"
import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

const Header = () => {
  return (
    <div className="w-full pl-2 pr-4 min-h-16 bg-blue-500 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Image src="/svg/logo.svg" alt="logo" width={200} height={200} className="size-10" />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <BellRing />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default Header
