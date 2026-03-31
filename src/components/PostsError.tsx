import { useTranslation } from 'react-i18next'

export function PostsError() {
  const { t } = useTranslation()
  return (
    <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
      <p className="text-destructive font-medium">{t('posts.failLoad')}</p>
      <p className="text-sm text-muted-foreground mt-1">
        {t('posts.checkConnection')}
      </p>
    </div>
  )
}
