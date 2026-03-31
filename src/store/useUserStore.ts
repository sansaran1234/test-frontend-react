import { create } from 'zustand'
import type { User } from '@/api/users'

interface UserState {
  localUsers: User[]
  hiddenUserIds: number[]
  upsertUser: (user: User) => void
  removeLocalUser: (id: number) => void
  hideUser: (id: number) => void
}

export const useUserStore = create<UserState>((set) => ({
  localUsers: [],
  hiddenUserIds: [],
  upsertUser: (user) =>
    set((state) => {
      const existingIndex = state.localUsers.findIndex((u) => u.id === user.id)
      if (existingIndex === -1) {
        return { localUsers: [user, ...state.localUsers] }
      }

      const next = [...state.localUsers]
      next[existingIndex] = { ...next[existingIndex], ...user }
      return { localUsers: next }
    }),
  removeLocalUser: (id) =>
    set((state) => ({ localUsers: state.localUsers.filter((u) => u.id !== id) })),
  hideUser: (id) =>
    set((state) =>
      state.hiddenUserIds.includes(id)
        ? state
        : { hiddenUserIds: [id, ...state.hiddenUserIds] }
    ),
}))

