import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useGetUser, useUpdateUser } from '@/hooks/useUsers'
import { UserForm, type UserFormValues } from '@/components/users/UserForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/useUserStore'

const UserDetailPage = () => {
  const { t } = useTranslation()
  const { userId } = Route.useParams()
  const id = Number(userId)
  const navigate = useNavigate()

  const localUsers = useUserStore((state) => state.localUsers)
  const localUser = localUsers.find((u) => u.id === id)
  const upsertUser = useUserStore((state) => state.upsertUser)

  const { data: user, isLoading, isError } = useGetUser(id)
  const { mutate: updateUser, isPending } = useUpdateUser(id)

  const handleSubmit = (values: UserFormValues) => {
    updateUser(values, {
      onSuccess: (updated) => {
        const base = user ?? localUser
        const { id: _baseId, ...baseRest } = base ?? { id }
        const { id: _updatedId, ...updatedRest } = updated
        upsertUser({ ...baseRest, ...updatedRest, ...values, id })
        toast.success(t('users.updateSuccess', 'User updated successfully'))
      },
      onError: () => toast.error(t('users.updateError', 'Failed to update user. Please try again.')),
    })
  }

  const fallbackUser = localUser ?? user

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/users" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('users.backToUsers', 'Back to Users')}
        </Link>
      </div>

      {isError && !localUser ? (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive font-medium">{t('users.notFound', 'User not found.')}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t('users.notFoundDesc', "The user you're looking for doesn't exist or has been deleted.")}
          </p>
          <Link to="/users" className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}>
            {t('users.backToUsers', 'Back to Users')}
          </Link>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl">{t('users.editTitle', 'Edit User')}</CardTitle>
                <CardDescription>{t('users.editDesc', 'Update the user details below.')}</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs shrink-0">
                #{userId}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && !localUser ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ) : (
              <UserForm
                defaultValues={{
                  name: fallbackUser?.name,
                  username: fallbackUser?.username,
                  email: fallbackUser?.email,
                  phone: fallbackUser?.phone,
                  website: fallbackUser?.website,
                }}
                onSubmit={handleSubmit}
                onCancel={() => navigate({ to: '/users' })}
                isLoading={isPending}
                submitLabel={t('users.saveChanges', 'Save Changes')}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export const Route = createFileRoute('/users/$userId')({
  component: UserDetailPage,
})
