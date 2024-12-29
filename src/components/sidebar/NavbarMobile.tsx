"use client"
import React from "react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { FolderKanban, Handshake, House, LayoutDashboard, Rabbit } from "lucide-react"

const NavbarMobile = () => {
  const links = [
    {
      title: "Home",
      icon: <House className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },

    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/dashboard",
    },
    {
      title: "Vocabulary",
      icon: <FolderKanban className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/vocabulary",
    },
    {
      title: "About",
      icon: <Rabbit className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/about",
    },
    {
      title: "Contact",
      icon: <Handshake className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/contact",
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 flex items-center justify-center h-fit w-full ">
      <div className="w-fit flex items-center justify-center gap-2 bg-transparent p-2 rounded-full">
        {links.map((item, idx) => (
          <div key={idx}>
            <Link
              href={item.href}
              key={item.title}
              className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
            >
              <div className="h-4 w-4">{item.icon}</div>
            </Link>
          </div>
        ))}
        <ThemeToggle isMobile={true} />
      </div>
    </div>
  )
}
export default NavbarMobile
