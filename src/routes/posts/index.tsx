import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useGetPosts, useDeletePost } from '@/hooks/usePosts'
import { PostsTable } from '@/components/PostsTable'
import { PageHeader } from '@/components/PageHeader'
import { PostsError } from '@/components/PostsError'
import { PostsLoading } from '@/components/PostsLoading'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { usePostStore } from '@/store/usePostStore'
import { Plus } from 'lucide-react'

const PostsListPage = () => {
  const { t } = useTranslation()
  const { data: posts, isLoading, isError } = useGetPosts()
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost()
  const localPosts = usePostStore((state) => state.localPosts)
  const removePost = usePostStore((state) => state.removePost)

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => {
        removePost(id)
        toast.success(t('posts.deleteSuccess', { id }))
      },
      onError: () => toast.error(t('posts.deleteError')),
    })
  }

  const displayPosts = React.useMemo(
    () => [...localPosts, ...(posts ?? [])],
    [localPosts, posts]
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('posts.title')}
        subtitle={t('posts.subtitle')}
        action={{
          to: '/posts/create',
          icon: <Plus className="h-4 w-4 mr-2" />,
          label: t('posts.createBtn'),
        }}
      />
      {isError ? (
        <PostsError />
      ) : isLoading ? (
        <PostsLoading />
      ) : (
        <PostsTable data={displayPosts} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  )
}

export const Route = createFileRoute('/posts/')({
  component: PostsListPage,
})
