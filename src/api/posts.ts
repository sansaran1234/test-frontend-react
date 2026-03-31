// src/api/posts.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export type CreatePostInput = Pick<Post, 'title' | 'body' | 'userId'>
export type UpdatePostInput = Partial<Pick<Post, 'title' | 'body'>>

export const getPosts = async (): Promise<Post[]> => {
  const { data } = await api.get<Post[]>('/posts')
  return data
}

export const getPostById = async (id: number): Promise<Post> => {
  const { data } = await api.get<Post>(`/posts/${id}`)
  return data
}

export const createPost = async (input: CreatePostInput): Promise<Post> => {
  const { data } = await api.post<Post>('/posts', input)
  return data
}

export const updatePost = async (id: number, input: UpdatePostInput): Promise<Post> => {
  const { data } = await api.patch<Post>(`/posts/${id}`, input)
  return data
}

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`)
}
