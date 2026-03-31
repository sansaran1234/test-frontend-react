// src/routes/posts/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useGetPosts, useDeletePost } from '@/hooks/usePosts'
import { PostsTable } from '@/components/PostsTable'
import { PostsHeader } from '@/components/PostsHeader'
import { PostsError } from '@/components/PostsError'
import { PostsLoading } from '@/components/PostsLoading'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const PostsListPage = () => {
  const { t } = useTranslation()
  const { data: posts, isLoading, isError } = useGetPosts()
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost()

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => toast.success(t('posts.deleteSuccess', { id })),
      onError: () => toast.error(t('posts.deleteError')),
    })
  }

  return (
    <div className="space-y-6">
      <PostsHeader />
      {isError ? (
        <PostsError />
      ) : isLoading ? (
        <PostsLoading />
      ) : (
        <PostsTable data={posts ?? []} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  )
}

export const Route = createFileRoute('/posts/')({
  component: PostsListPage,
})
