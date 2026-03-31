import { create } from 'zustand'
import type { Comment } from '@/api/comments'

interface CommentState {
  localComments: Comment[]
  hiddenCommentIds: number[]
  upsertComment: (comment: Comment) => void
  removeLocalComment: (id: number) => void
  hideComment: (id: number) => void
}

export const useCommentStore = create<CommentState>((set) => ({
  localComments: [],
  hiddenCommentIds: [],
  upsertComment: (comment) =>
    set((state) => {
      const existingIndex = state.localComments.findIndex((c) => c.id === comment.id)
      if (existingIndex === -1) {
        return { localComments: [comment, ...state.localComments] }
      }

      const next = [...state.localComments]
      next[existingIndex] = { ...next[existingIndex], ...comment }
      return { localComments: next }
    }),
  removeLocalComment: (id) =>
    set((state) => ({ localComments: state.localComments.filter((c) => c.id !== id) })),
  hideComment: (id) =>
    set((state) =>
      state.hiddenCommentIds.includes(id)
        ? state
        : { hiddenCommentIds: [id, ...state.hiddenCommentIds] }
    ),
}))

