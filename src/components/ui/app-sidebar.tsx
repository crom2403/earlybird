import { CircleHelp, Contact, Home, LayoutDashboard, Rabbit, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { pathnames } from "@/utils/pathnames"

// Menu items.
const items = [
  {
    title: "Home",
    url: pathnames.home,
    icon: Home,
  },
  {
    title: "Dashboard",
    url: pathnames.dashboard,
    icon: LayoutDashboard,
  },
  {
    title: "Vocabulary",
    url: pathnames.vocabulary,
    icon: Contact,
  },
  {
    title: "Settings",
    url: pathnames.setting,
    icon: Settings,
  },
  {
    title: "Contact",
    url: pathnames.contact,
    icon: Contact,
  },
  {
    title: "About",
    url: pathnames.about,
    icon: Rabbit,
  },
  {
    title: "Help",
    url: pathnames.help,
    icon: CircleHelp,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="dark:border-neutral-800">
      <SidebarContent className="dark:bg-black/80">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
