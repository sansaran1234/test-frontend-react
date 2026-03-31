import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useCreateComment } from '@/hooks/useComments'
import { CommentForm, type CommentFormValues } from '@/components/CommentForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCommentStore } from '@/store/useCommentStore'
import { useTranslation } from 'react-i18next'

const CommentCreatePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutate: createComment, isPending } = useCreateComment()
  const upsertComment = useCommentStore((state) => state.upsertComment)

  const handleSubmit = (values: CommentFormValues) => {
    createComment(values, {
      onSuccess: (created) => {
        upsertComment(created)
        toast.success(
          t('comments.createSuccess', {
            id: created.id,
            defaultValue: 'Comment created successfully (ID: {{id}})',
          })
        )
        navigate({ to: '/comments' })
      },
      onError: () =>
        toast.error(t('comments.createError', 'Failed to create comment. Please try again.')),
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/comments" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('comments.backToComments', 'Back to Comments')}
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {t('comments.createTitle', 'Create New Comment')}
          </CardTitle>
          <CardDescription>
            {t('comments.createDesc', 'Fill in the details below to create a new comment.')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommentForm
            onSubmit={handleSubmit}
            onCancel={() => navigate({ to: '/comments' })}
            isLoading={isPending}
            submitLabel={t('comments.createBtn', 'Create Comment')}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/comments/create')({
  component: CommentCreatePage,
})

