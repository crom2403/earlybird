import Header from "@/components/header/Header"
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Toaster } from "sonner"
import { getServerSideUser } from "@/app/lib/payload-utils"

const App = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerSideUser()
  console.log("user", user)
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* <Sidebar /> */}
        <AppSidebar />
        <div className="w-full flex flex-col">
          <Header me={user} />
          {children}
          <Toaster position="top-center" expand={false} richColors />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
