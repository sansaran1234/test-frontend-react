import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useGetPosts, useDeletePost } from '@/hooks/usePosts'
import { PostsTable } from '@/components/posts/PostsTable'
import { PageHeader } from '@/components/shared/PageHeader'
import { PostsError } from '@/components/posts/PostsError'
import { PostsLoading } from '@/components/posts/PostsLoading'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { usePostStore } from '@/store/usePostStore'
import { Plus } from 'lucide-react'

const PostsListPage = () => {
  const { t } = useTranslation()
  const { data: posts, isLoading, isError } = useGetPosts()
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost()
  const localPosts = usePostStore((state) => state.localPosts)
  const hiddenPostIds = usePostStore((state) => state.hiddenPostIds)
  const removeLocalPost = usePostStore((state) => state.removeLocalPost)
  const hidePost = usePostStore((state) => state.hidePost)

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => {
        hidePost(id)
        removeLocalPost(id)
        toast.success(t('posts.deleteSuccess', { id }))
      },
      onError: () => toast.error(t('posts.deleteError')),
    })
  }

  const displayPosts = React.useMemo(() => {
    const hidden = new Set(hiddenPostIds)
    const localIds = new Set(localPosts.map((p) => p.id))

    const locals = localPosts.filter((p) => !hidden.has(p.id))
    const remotes = (posts ?? []).filter((p) => !hidden.has(p.id) && !localIds.has(p.id))

    return [...locals, ...remotes]
  }, [posts, localPosts, hiddenPostIds])

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
