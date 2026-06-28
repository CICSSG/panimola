"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  BarChart2,
  Building2,
  CalendarDays,
  LayoutDashboardIcon,
  ListIcon,
  PlayCircle,
  Target,
  UsersIcon,
} from "lucide-react"
import {
  getVisibleManagementSections,
  type ManagementPageDefinition,
  type PageAccess,
} from "@/lib/management-permissions"
import { ThemeToggle } from "./theme-provider"
import { Separator } from "./ui/separator"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userData?: any
}

const iconByKey = {
  dashboard: <LayoutDashboardIcon />,
  list: <ListIcon />,
  building: <Building2 />,
  calendar: <CalendarDays />,
  target: <Target />,
  users: <UsersIcon />,
  chart: <BarChart2 />,
} satisfies Record<ManagementPageDefinition["iconKey"], React.ReactNode>

export function AppSidebar({ userData, ...props }: AppSidebarProps) {
  const { open } = useSidebar()
  const adminRole = userData?.publicMetadata?.adminRole as
    | "superadmin"
    | "admin"
    | null
  const pageAccess = userData?.publicMetadata?.pageAccess as
    | PageAccess
    | undefined

  const visibleSections = getVisibleManagementSections(pageAccess, adminRole)
  const sectionsWithIcons = visibleSections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      icon: iconByKey[item.iconKey],
    })),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/admin/dashboard" />}
            >
              {/* <Image
                src="/images/ProspaceMinimalLogo.png"
                alt="Prospace Logo"
                height={25}
                width={25}
              /> */}
              <PlayCircle className="h-6 w-6" />
              <span className="text-base font-semibold">CICS Panimola</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sectionsWithIcons.map((section, index) => (
          <React.Fragment key={section.key}>
            {index > 0 && !open && (
              <Separator
                orientation="horizontal"
                className="mx-2 ml-auto h-4 data-vertical:self-auto"
              />
            )}
            <NavMain data={section} />
          </React.Fragment>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Separator
          orientation="horizontal"
          className="mx-2 ml-auto h-4 data-vertical:self-auto"
        />

        <SidebarMenuItem key="test">
          <SidebarMenuButton
            tooltip="Switch Theme"
            className={open ? "border p-2" : "border"}
          >
            <ThemeToggle />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}
