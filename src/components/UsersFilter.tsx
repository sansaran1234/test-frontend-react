import { Loader2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

interface UsersFilterProps {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  isFiltering?: boolean
}

export const UsersFilter = ({
  globalFilter,
  setGlobalFilter,
  isFiltering,
}: UsersFilterProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative max-w-sm flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('users.searchPlaceholder', 'Search users...')}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          aria-busy={isFiltering}
          className="pl-9 pr-9"
        />
        {isFiltering ? (
          <Loader2
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin"
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  )
}

