/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BellRing, Search } from "lucide-react"
import Image from "next/image"
import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import IconLoginButton from "@/components/login/IconLoginGoogle"
import AvatarDropdown from "@/components/header/AvatarDropdown"
import Link from "next/link"

const Header = async ({ me }: { me: any }) => {
  return (
    <div className="w-full pl-2 pr-4 min-h-16 dark:bg-black/80 flex gap-4 md:grid md:grid-cols-3 border-b dark:border-neutral-800 border-neutral-200">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Link href="/">
          <Image
            src="/svg/logo.svg"
            alt="logo"
            width={200}
            height={200}
            className="size-10 min-w-8"
          />
        </Link>
      </div>
      <div className="flex items-center justify-center relative w-full">
        <Input
          className="py-5 rounded-full pl-10 focus:border-none w-full"
          placeholder="Tìm khóa học, từ vựng..."
        />
        <div className="absolute left-3">
          <Search className="size-5" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 w-fit-content">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <BellRing className="hidden md:block" />
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
