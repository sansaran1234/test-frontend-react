import { useTranslation } from 'react-i18next'
import { Switch } from '@/components/ui/switch'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const isThai = i18n.language === 'th'

  const handleLanguageChange = (checked: boolean) => {
    i18n.changeLanguage(checked ? 'th' : 'en')
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${!isThai ? 'text-foreground' : 'text-muted-foreground'}`}>EN</span>
      <Switch
        checked={isThai}
        onCheckedChange={handleLanguageChange}
        aria-label="Toggle language"
      />
      <span className={`text-sm font-medium ${isThai ? 'text-foreground' : 'text-muted-foreground'}`}>TH</span>
    </div>
  )
}
