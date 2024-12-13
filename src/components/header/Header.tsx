/* eslint-disable @typescript-eslint/no-explicit-any */

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BellRing, Search } from "lucide-react"
import Image from "next/image"
import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { getMe } from "@/actions/user-action"
import IconLoginButton from "@/components/login/IconLoginGoogle"
import AvatarDropdown from "@/components/header/AvatarDropdown"

const Header = async () => {
  const me = await getMe()
  return (
    <div className="w-full pl-2 pr-4 min-h-16 dark:bg-black/80 grid grid-cols-3 border-b dark:border-neutral-800 border-neutral-200">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Image src="/svg/logo.svg" alt="logo" width={200} height={200} className="size-10" />
      </div>
      <div className="flex items-center justify-center relative">
        <Input
          className="py-5 rounded-full pl-10 focus:border-none"
          placeholder="Tìm kiếm khóa học, từ vựng..."
        />
        <div className="absolute left-3">
          <Search className="size-5" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4">
        <ThemeToggle />
        <BellRing />
        {me ? (
          <>
            <AvatarDropdown me={me} />
          </>
        ) : (
          <IconLoginButton />
        )}
      </div>
    </div>
  )
}

export default Header
