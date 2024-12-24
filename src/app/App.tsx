import Header from "@/components/header/Header"
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Toaster } from "sonner"
import { getServerSideUser } from "@/app/lib/payload-utils"
import dynamic from "next/dynamic"

const NavbarMobile = dynamic(() => import("@/components/sidebar/NavbarMobile"), { ssr: false })

const App = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerSideUser()
  // console.log("user", user)
  return (
    <SidebarProvider>
      <div className="flex w-full h-full relative">
        {/* <Sidebar /> */}
        <AppSidebar />
        <div className="w-full flex flex-col">
          <Header me={user} />
          <div className="w-full h-[calc(100vh-64px)]">{children}</div>
          <Toaster position="top-center" expand={false} richColors />
          <NavbarMobile />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
