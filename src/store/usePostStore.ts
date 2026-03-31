import { create } from 'zustand'
import type { Post } from '@/api/posts'

interface PostState {
  localPosts: Post[]
  addPost: (post: Post) => void
  removePost: (id: number) => void
}

export const usePostStore = create<PostState>((set) => ({
  localPosts: [],
  addPost: (post) =>
    set((state) => ({ localPosts: [post, ...state.localPosts] })),
  removePost: (id) =>
    set((state) => ({
      localPosts: state.localPosts.filter((p) => p.id !== id),
    })),
}))
