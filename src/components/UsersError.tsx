import { useTranslation } from 'react-i18next'

export const UsersError = () => {
  const { t } = useTranslation()
  return (
    <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
      <p className="text-destructive font-medium">
        {t('users.failLoad', 'Failed to load users.')}
      </p>
      <p className="text-sm text-muted-foreground mt-1">
        {t('users.checkConnection', 'Please check your connection and try again.')}
      </p>
    </div>
  )
}

