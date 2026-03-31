import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export type CreateCommentInput = Pick<Comment, 'postId' | 'name' | 'email' | 'body'>
export type UpdateCommentInput = Partial<Pick<Comment, 'postId' | 'name' | 'email' | 'body'>>

export const getComments = async (): Promise<Comment[]> => {
  const { data } = await api.get<Comment[]>('/comments')
  return data
}

export const getCommentById = async (id: number): Promise<Comment> => {
  const { data } = await api.get<Comment>(`/comments/${id}`)
  return data
}

export const createComment = async (input: CreateCommentInput): Promise<Comment> => {
  const { data } = await api.post<Comment>('/comments', input)
  return data
}

export const updateComment = async (id: number, input: UpdateCommentInput): Promise<Comment> => {
  const { data } = await api.patch<Comment>(`/comments/${id}`, input)
  return data
}

export const deleteComment = async (id: number): Promise<void> => {
  await api.delete(`/comments/${id}`)
}

