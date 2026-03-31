import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
  type CreateCommentInput,
  type UpdateCommentInput,
} from '@/api/comments'

const COMMENTS_KEY = ['comments'] as const

export const useGetComments = () =>
  useQuery({
    queryKey: COMMENTS_KEY,
    queryFn: getComments,
  })

export const useGetComment = (id: number) =>
  useQuery({
    queryKey: [...COMMENTS_KEY, id],
    queryFn: () => getCommentById(id),
    enabled: !!id,
  })

export const useCreateComment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateCommentInput) => createComment(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: COMMENTS_KEY }),
  })
}

export const useUpdateComment = (id: number) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateCommentInput) => updateComment(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: COMMENTS_KEY })
      qc.invalidateQueries({ queryKey: [...COMMENTS_KEY, id] })
    },
  })
}

export const useDeleteComment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: COMMENTS_KEY }),
  })
}

