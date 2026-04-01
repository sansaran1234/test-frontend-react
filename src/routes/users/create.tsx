import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useCreateUser } from '@/hooks/useUsers'
import { UserForm, type UserFormValues } from '@/components/users/UserForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/useUserStore'
import { useTranslation } from 'react-i18next'

const UserCreatePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutate: createUser, isPending } = useCreateUser()
  const upsertUser = useUserStore((state) => state.upsertUser)

  const handleSubmit = (values: UserFormValues) => {
    createUser(values, {
      onSuccess: (created) => {
        upsertUser(created)
        toast.success(t('users.createSuccess', { id: created.id, defaultValue: 'User created successfully (ID: {{id}})' }))
        navigate({ to: '/users' })
      },
      onError: () => toast.error(t('users.createError', 'Failed to create user. Please try again.')),
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link to="/users" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('users.backToUsers', 'Back to Users')}
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t('users.createTitle', 'Create New User')}</CardTitle>
          <CardDescription>{t('users.createDesc', 'Fill in the details below to create a new user.')}</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            onSubmit={handleSubmit}
            onCancel={() => navigate({ to: '/users' })}
            isLoading={isPending}
            submitLabel={t('users.createBtn', 'Create User')}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/users/create')({
  component: UserCreatePage,
})
