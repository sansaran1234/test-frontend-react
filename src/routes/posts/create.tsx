// src/routes/posts/create.tsx
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useCreatePost } from '@/hooks/usePosts'
import { PostForm, type PostFormValues } from '@/components/PostForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePostStore } from '@/store/usePostStore'


const PostCreatePage = () => {
  const navigate = useNavigate()
  const { mutate: createPost, isPending } = useCreatePost()
  const addPost = usePostStore((state) => state.addPost)

  const handleSubmit = (values: PostFormValues) => {
    createPost(
      { ...values, userId: 1 },
      {
        onSuccess: (created) => {
          addPost(created)
          toast.success(`Post created successfully (ID: ${created.id})`)
          navigate({ to: '/posts' })
        },
        onError: () => {
          toast.error('Failed to create post. Please try again.')
        },
      }
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/posts" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Posts
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Post</CardTitle>
          <CardDescription>Fill in the details below to publish a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <PostForm
            onSubmit={handleSubmit}
            onCancel={() => navigate({ to: '/posts' })}
            isLoading={isPending}
            submitLabel="Create Post"
          />
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/posts/create')({
  component: PostCreatePage,
})
