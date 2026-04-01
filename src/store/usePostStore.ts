import { create } from 'zustand'
import type { Post } from '@/api/posts'

interface PostState {
  localPosts: Post[]
  hiddenPostIds: number[]
  upsertPost: (post: Post) => void
  removeLocalPost: (id: number) => void
  hidePost: (id: number) => void
}

export const usePostStore = create<PostState>((set) => ({
  localPosts: [],
  hiddenPostIds: [],
  upsertPost: (post) =>
    set((state) => {
      const existingIndex = state.localPosts.findIndex((p) => p.id === post.id)
      if (existingIndex === -1) {
        return { localPosts: [post, ...state.localPosts] }
      }

      const next = [...state.localPosts]
      next[existingIndex] = { ...next[existingIndex], ...post }
      return { localPosts: next }
    }),
  removeLocalPost: (id) =>
    set((state) => ({ localPosts: state.localPosts.filter((p) => p.id !== id) })),
  hidePost: (id) =>
    set((state) =>
      state.hiddenPostIds.includes(id)
        ? state
        : { hiddenPostIds: [id, ...state.hiddenPostIds] }
    ),
}))
