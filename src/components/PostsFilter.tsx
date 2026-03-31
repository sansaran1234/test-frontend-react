import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'
import { useGetUsers } from '@/hooks/useUsers'

interface PostsFilterProps {
  globalFilter: string
  setGlobalFilter: (value: string) => void
  userFilter: string
  setUserFilter: (value: string) => void
}

export function PostsFilter({
  globalFilter,
  setGlobalFilter,
  userFilter,
  setUserFilter,
}: PostsFilterProps) {
  const { t } = useTranslation()
  const { data: users } = useGetUsers()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="relative max-w-sm flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('posts.searchPlaceholder', 'Search...')}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={userFilter} onValueChange={(val) => setUserFilter(val || 'all')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('posts.allUsers', 'All Users')}>
            {userFilter === 'all'
              ? t('posts.allUsers', 'All Users')
              : users?.find((u) => String(u.id) === userFilter)?.name ||
                `${t('posts.user', 'User')} ${userFilter}`}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t('posts.allUsers', 'All Users')}</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={String(user.id)}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
