import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/users'

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
