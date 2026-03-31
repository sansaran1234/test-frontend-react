// src/routes/posts/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useGetPosts, useDeletePost } from '@/hooks/usePosts'
import { PostsTable } from '@/components/PostsTable'
import { PostsHeader } from '@/components/PostsHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'


const PostsListPage = () => {
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
      <PostsHeader />

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

export const Route = createFileRoute('/posts/')({
  component: PostsListPage,
})
