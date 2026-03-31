import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
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
        render={<Button variant="outline" size="sm" className="w-[70px] flex gap-2" />}
      >
        <Globe className="h-4 w-4" />
        {i18n.language === 'th' ? 'TH' : 'EN'}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuCheckboxItem 
          checked={i18n.language === 'en'} 
          onCheckedChange={() => handleLanguageChange('en')}
        >
          English (EN)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem 
          checked={i18n.language === 'th'} 
          onCheckedChange={() => handleLanguageChange('th')}
        >
          ภาษาไทย (TH)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
