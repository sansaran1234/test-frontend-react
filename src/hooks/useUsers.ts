import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  type CreateUserInput,
  type UpdateUserInput,
} from '@/api/users'

const USERS_KEY = ['users'] as const

export const useGetUsers = () =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: getUsers,
  })

export const useGetUser = (id: number) =>
  useQuery({
    queryKey: [...USERS_KEY, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  })

export const useCreateUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
  })
}

export const useUpdateUser = (id: number) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateUserInput) => updateUser(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USERS_KEY })
      qc.invalidateQueries({ queryKey: [...USERS_KEY, id] })
    },
  })
}

export const useDeleteUser = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
  })
}
