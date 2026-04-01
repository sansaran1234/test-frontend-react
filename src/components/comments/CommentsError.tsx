import { useTranslation } from 'react-i18next'

export const CommentsError = () => {
  const { t } = useTranslation()
  return (
    <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
      <p className="text-destructive font-medium">
        {t('comments.failLoad', 'Failed to load comments.')}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {t('comments.checkConnection', 'Please check your connection and try again.')}
      </p>
    </div>
  )
}
