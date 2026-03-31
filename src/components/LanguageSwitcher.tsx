import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" className="w-[80px] flex gap-2" />}
      >
        <Globe className="h-4 w-4" />
        {i18n.language === 'th' ? 'TH' : 'EN'}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('th')}>
          ภาษาไทย (TH)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
