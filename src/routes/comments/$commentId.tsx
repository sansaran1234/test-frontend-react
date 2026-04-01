import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useGetComment, useUpdateComment } from '@/hooks/useComments'
import { CommentForm, type CommentFormValues } from '@/components/comments/CommentForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useCommentStore } from '@/store/useCommentStore'

const CommentDetailPage = () => {
  const { t } = useTranslation()
  const { commentId } = Route.useParams()
  const id = Number(commentId)
  const navigate = useNavigate()

  const localComments = useCommentStore((state) => state.localComments)
  const localComment = localComments.find((c) => c.id === id)
  const upsertComment = useCommentStore((state) => state.upsertComment)

  const { data: comment, isLoading, isError } = useGetComment(id)
  const { mutate: updateComment, isPending } = useUpdateComment(id)

  const handleSubmit = (values: CommentFormValues) => {
    updateComment(values, {
      onSuccess: (updated) => {
        const base = comment ?? localComment
        const { id: _baseId, ...baseRest } = base ?? { id }
        const { id: _updatedId, ...updatedRest } = updated
        upsertComment({ ...baseRest, ...updatedRest, ...values, id })
        toast.success(t('comments.updateSuccess', 'Comment updated successfully'))
      },
      onError: () =>
        toast.error(t('comments.updateError', 'Failed to update comment. Please try again.')),
    })
  }

  const fallbackComment = localComment ?? comment

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/comments" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('comments.backToComments', 'Back to Comments')}
        </Link>
      </div>

      {isError && !localComment ? (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive font-medium">{t('comments.notFound', 'Comment not found.')}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t('comments.notFoundDesc', "The comment you're looking for doesn't exist or has been deleted.")}
          </p>
          <Link to="/comments" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
            {t('comments.backToComments', 'Back to Comments')}
          </Link>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl">{t('comments.editTitle', 'Edit Comment')}</CardTitle>
                <CardDescription>{t('comments.editDesc', 'Update the comment details below.')}</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs shrink-0">
                #{commentId}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && !localComment ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ) : (
              <CommentForm
                defaultValues={{
                  postId: fallbackComment?.postId,
                  name: fallbackComment?.name,
                  email: fallbackComment?.email,
                  body: fallbackComment?.body,
                }}
                onSubmit={handleSubmit}
                onCancel={() => navigate({ to: '/comments' })}
                isLoading={isPending}
                submitLabel={t('comments.saveChanges', 'Save Changes')}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export const Route = createFileRoute('/comments/$commentId')({
  component: CommentDetailPage,
})
