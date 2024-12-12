import Header from "@/components/header/Header"
// import Sidebar from "@/components/sidebar/Sidebar"
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {/* <Sidebar /> */}
        <AppSidebar />
        <div className="w-full flex flex-col">
          <Header />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
