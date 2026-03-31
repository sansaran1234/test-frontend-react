import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ModeToggle } from '@/components/ModeToggle'
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const { t } = useTranslation()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 bg-background">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <div className="hidden md:flex items-center gap-2 ml-2 font-semibold">
              <FileText className="h-4 w-4" />
              <span>{t('root.title')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 max-w-full mx-auto w-full">
          <Outlet />
        </main>
        <Toaster richColors position="top-right" />
      </SidebarInset>
    </SidebarProvider>
  )
}
