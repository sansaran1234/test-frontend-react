import axios from 'axios'

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone?: string
  website?: string
  company?: {
    name?: string
  }
}

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export type CreateUserInput = Pick<User, 'name' | 'username' | 'email' | 'phone' | 'website'>
export type UpdateUserInput = Partial<CreateUserInput>

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get<User[]>('/users')
  return data
}

export const getUserById = async (id: number): Promise<User> => {
  const { data } = await api.get<User>(`/users/${id}`)
  return data
}

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const { data } = await api.post<User>('/users', input)
  return data
}

export const updateUser = async (id: number, input: UpdateUserInput): Promise<User> => {
  const { data } = await api.patch<User>(`/users/${id}`, input)
  return data
}

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}
