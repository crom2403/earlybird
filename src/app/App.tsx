import Header from "@/components/header/Header"
// import Sidebar from "@/components/sidebar/Sidebar"
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Toaster } from "sonner"

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* <Sidebar /> */}
        <AppSidebar />
        <div className="w-full flex flex-col">
          <Header />
          {children}
          <Toaster position="top-center" expand={false} richColors />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
