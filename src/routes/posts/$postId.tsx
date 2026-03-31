// src/routes/posts/$postId.tsx
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useGetPost, useUpdatePost } from '@/hooks/usePosts'
import { PostForm, type PostFormValues } from '@/components/PostForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetailPage,
})

function PostDetailPage() {
  const { postId } = Route.useParams()
  const id = Number(postId)
  const navigate = useNavigate()

  const { data: post, isLoading, isError } = useGetPost(id)
  const { mutate: updatePost, isPending } = useUpdatePost(id)

  const handleSubmit = (values: PostFormValues) => {
    updatePost(values, {
      onSuccess: () => toast.success('Post updated successfully'),
      onError: () => toast.error('Failed to update post. Please try again.'),
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/posts" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Posts
        </Link>
      </div>

      {isError ? (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive font-medium">Post not found.</p>
          <p className="text-sm text-muted-foreground mt-1">
            The post you're looking for doesn't exist or has been deleted.
          </p>
          <Link to="/posts" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
            Back to Posts
          </Link>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl">Edit Post</CardTitle>
                <CardDescription>Update the post details below.</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs shrink-0">
                #{postId}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ) : (
              <PostForm
                defaultValues={{ title: post?.title, body: post?.body }}
                onSubmit={handleSubmit}
                onCancel={() => navigate({ to: '/posts' })}
                isLoading={isPending}
                submitLabel="Save Changes"
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
