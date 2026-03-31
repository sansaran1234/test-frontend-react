import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDeleteComment, useGetComments } from '@/hooks/useComments'
import { CommentsTable } from '@/components/CommentsTable'
import { CommentsHeader } from '@/components/CommentsHeader'
import { CommentsError } from '@/components/CommentsError'
import { CommentsLoading } from '@/components/CommentsLoading'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useCommentStore } from '@/store/useCommentStore'

const CommentsListPage = () => {
  const { t } = useTranslation()
  const { data: comments, isLoading, isError } = useGetComments()
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment()
  const localComments = useCommentStore((state) => state.localComments)
  const hiddenCommentIds = useCommentStore((state) => state.hiddenCommentIds)
  const removeLocalComment = useCommentStore((state) => state.removeLocalComment)
  const hideComment = useCommentStore((state) => state.hideComment)

  const displayComments = React.useMemo(() => {
    const hidden = new Set(hiddenCommentIds)
    const localIds = new Set(localComments.map((c) => c.id))

    const locals = localComments.filter((c) => !hidden.has(c.id))
    const remotes = (comments ?? []).filter((c) => !hidden.has(c.id) && !localIds.has(c.id))

    return [...locals, ...remotes]
  }, [comments, localComments, hiddenCommentIds])

  const handleDelete = (id: number) => {
    deleteComment(id, {
      onSuccess: () => {
        hideComment(id)
        removeLocalComment(id)
        toast.success(
          t('comments.deleteSuccess', { id, defaultValue: 'Comment #{{id}} deleted successfully' })
        )
      },
      onError: () =>
        toast.error(t('comments.deleteError', 'Failed to delete comment. Please try again.')),
    })
  }

  return (
    <div className="space-y-6">
      <CommentsHeader />
      {isError ? (
        <CommentsError />
      ) : isLoading ? (
        <CommentsLoading />
      ) : (
        <CommentsTable data={displayComments} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  )
}

export const Route = createFileRoute('/comments/')({
  component: CommentsListPage,
})

