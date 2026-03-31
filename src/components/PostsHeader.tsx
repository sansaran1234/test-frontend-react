import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export const PostsHeader = () => {
  const { t } = useTranslation()
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('posts.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('posts.subtitle')}</p>
      </div>
      <Link to="/posts/create" className={cn(buttonVariants({ variant: 'default' }))}>
        <Plus className="h-4 w-4 mr-2" />
        {t('posts.createBtn')}
      </Link>
    </div>
  )
}
