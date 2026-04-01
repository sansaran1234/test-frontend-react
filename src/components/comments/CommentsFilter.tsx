import { Loader2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useTranslation } from 'react-i18next'

interface CommentsFilterProps {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  isFiltering?: boolean
}

export const CommentsFilter = ({
  globalFilter,
  setGlobalFilter,
  isFiltering,
}: CommentsFilterProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
      <div className="relative max-w-sm flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('comments.searchPlaceholder', 'Search comments...')}
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
