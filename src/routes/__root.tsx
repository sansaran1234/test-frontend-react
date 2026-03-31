// src/routes/__root.tsx
import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { FileText } from 'lucide-react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center gap-4 px-4">
          <Link
            to="/posts"
            className="flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
          >
            <FileText className="h-5 w-5" />
            <span>Posts Manager</span>
          </Link>
          <nav className="flex items-center gap-4 ml-auto">
            <Link
              to="/posts"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-medium"
            >
              Posts
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </div>
  )
}
