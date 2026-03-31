// src/routes/posts/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router'
import { useGetPosts, useDeletePost } from '@/hooks/usePosts'
import { PostsTable } from '@/components/PostsTable'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/posts/')({
  component: PostsListPage,
})

function PostsListPage() {
  const { data: posts, isLoading, isError } = useGetPosts()
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost()

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => toast.success(`Post #${id} deleted successfully`),
      onError: () => toast.error('Failed to delete post. Please try again.'),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Content */}
      {isError ? (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive font-medium">Failed to load posts.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Please check your connection and try again.
          </p>
        </div>
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <PostsTable data={posts ?? []} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  )
}
