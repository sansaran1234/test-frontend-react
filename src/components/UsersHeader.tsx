import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export const UsersHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('users.title', 'Users')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('users.subtitle', 'Manage and browse all users')}
        </p>
      </div>
      <Link to="/users/create" className={cn(buttonVariants({ variant: 'default' }))}>
        <Plus className="h-4 w-4 mr-2" />
        {t('users.createBtn', 'Create User')}
      </Link>
    </div>
  )
}

