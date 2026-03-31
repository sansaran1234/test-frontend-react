import { FileText } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "@tanstack/react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { t } = useTranslation()

  return (
    <Sidebar>
      <SidebarHeader className="h-14 flex items-center border-b px-4 justify-center">
        <div className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5" />
          <span>{t("root.title")}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={t("root.navPosts")}>
                  <Link to="/posts" activeProps={{ className: "font-medium text-sidebar-accent-foreground flex gap-2 cursor-pointer" }}>
                    <FileText />
                    <span>{t("root.navPosts")}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
