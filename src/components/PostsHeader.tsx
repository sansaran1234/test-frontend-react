import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function PostsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <p className="text-muted-foreground mt-1">Manage and browse all blog posts</p>
      </div>
      <Link to="/posts/create" className={cn(buttonVariants({ variant: 'default' }))}>
        <Plus className="h-4 w-4 mr-2" />
        Create Post
      </Link>
    </div>
  )
}
