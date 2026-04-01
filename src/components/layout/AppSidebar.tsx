import { FileText, MessageSquare, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link, useRouterState } from "@tanstack/react-router"

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

export const AppSidebar = () => {
  const { t } = useTranslation()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isPostsActive = pathname.startsWith("/posts")
  const isUsersActive = pathname.startsWith("/users")
  const isCommentsActive = pathname.startsWith("/comments")

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
                <SidebarMenuButton
                  tooltip={t("root.navPosts")}
                  isActive={isPostsActive}
                  render={
                    <Link to="/posts" activeProps={{ className: "font-medium text-sidebar-accent-foreground" }}>
                      <FileText />
                      <span>{t("root.navPosts")}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("root.navUsers")}
                  isActive={isUsersActive}
                  render={
                    <Link to="/users" activeProps={{ className: "font-medium text-sidebar-accent-foreground" }}>
                      <Users />
                      <span>{t("root.navUsers")}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={t("root.navComments")}
                  isActive={isCommentsActive}
                  render={
                    <Link to="/comments" activeProps={{ className: "font-medium text-sidebar-accent-foreground" }}>
                      <MessageSquare />
                      <span>{t("root.navComments")}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
