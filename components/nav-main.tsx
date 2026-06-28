"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  data,
}: {
  data: {
    title: string
    items: {
      title: string
      url: string
      icon: React.ReactNode
    }[]
  }
}) {
  const { open } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-nowrap truncate">{data.title}</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2 text-nowrap">
        <SidebarMenu>
          {data.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} className={open ? "p-2" : ""}>
                <Link
                  href={item.url}
                  className="flex h-full w-full items-center gap-2 text-nowrap flex-nowrap"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
