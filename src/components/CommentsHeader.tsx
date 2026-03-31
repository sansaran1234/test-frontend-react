import { Link } from '@tanstack/react-router'
import { MessageSquarePlus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export const CommentsHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t('comments.title', 'Comments')}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t('comments.subtitle', 'Manage and browse all comments')}
        </p>
      </div>
      <Link to="/comments/create" className={cn(buttonVariants({ variant: 'default' }))}>
        <MessageSquarePlus className="h-4 w-4 mr-2" />
        {t('comments.createBtn', 'Create Comment')}
      </Link>
    </div>
  )
}

