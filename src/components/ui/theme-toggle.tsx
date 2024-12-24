"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle({ isMobile }: { isMobile?: boolean }) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  if (isMobile) {
    return (
      <div
        onClick={toggleTheme}
        className="size-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center"
      >
        <Sun className="size-4 text-neutral-500 dark:text-neutral-300  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="size-4 text-neutral-500 dark:text-neutral-300 absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
    )
  } else {
    return (
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle Theme</span>
      </Button>
    )
  }
}
