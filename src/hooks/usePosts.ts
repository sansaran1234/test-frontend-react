// src/hooks/usePosts.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
  type CreatePostInput,
  type UpdatePostInput,
} from '@/api/posts'

const POSTS_KEY = ['posts'] as const

export const useGetPosts = () =>
  useQuery({
    queryKey: POSTS_KEY,
    queryFn: getPosts,
  })

export const useGetPost = (id: number) =>
  useQuery({
    queryKey: [...POSTS_KEY, id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  })

export const useCreatePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}

export const useUpdatePost = (id: number) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdatePostInput) => updatePost(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: POSTS_KEY })
      qc.invalidateQueries({ queryKey: [...POSTS_KEY, id] })
    },
  })
}

export const useDeletePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: POSTS_KEY }),
  })
}
