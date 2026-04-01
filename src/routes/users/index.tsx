import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useDeleteUser, useGetUsers } from '@/hooks/useUsers'
import { UsersTable } from '@/components/UsersTable'
import { PageHeader } from '@/components/PageHeader'
import { UsersError } from '@/components/UsersError'
import { UsersLoading } from '@/components/UsersLoading'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@/store/useUserStore'
import { Plus } from 'lucide-react'

const UsersListPage = () => {
  const { t } = useTranslation()
  const { data: users, isLoading, isError } = useGetUsers()
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()
  const localUsers = useUserStore((state) => state.localUsers)
  const hiddenUserIds = useUserStore((state) => state.hiddenUserIds)
  const removeLocalUser = useUserStore((state) => state.removeLocalUser)
  const hideUser = useUserStore((state) => state.hideUser)

  const displayUsers = React.useMemo(() => {
    const hidden = new Set(hiddenUserIds)
    const localIds = new Set(localUsers.map((u) => u.id))

    const locals = localUsers.filter((u) => !hidden.has(u.id))
    const remotes = (users ?? []).filter((u) => !hidden.has(u.id) && !localIds.has(u.id))

    return [...locals, ...remotes]
  }, [users, localUsers, hiddenUserIds])

  const handleDelete = (id: number) => {
    deleteUser(id, {
      onSuccess: () => {
        hideUser(id)
        removeLocalUser(id)
        toast.success(t('users.deleteSuccess', { id, defaultValue: 'User #{{id}} deleted successfully' }))
      },
      onError: () => toast.error(t('users.deleteError', 'Failed to delete user. Please try again.')),
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('users.title', 'Users')}
        subtitle={t('users.subtitle', 'Manage and browse all users')}
        action={{
          to: '/users/create',
          icon: <Plus className="h-4 w-4 mr-2" />,
          label: t('users.createBtn', 'Create User'),
        }}
      />
      {isError ? (
        <UsersError />
      ) : isLoading ? (
        <UsersLoading />
      ) : (
        <UsersTable data={displayUsers} onDelete={handleDelete} isDeleting={isDeleting} />
      )}
    </div>
  )
}

export const Route = createFileRoute('/users/')({
  component: UsersListPage,
})
