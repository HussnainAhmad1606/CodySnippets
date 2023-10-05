import { create } from 'zustand'

export const useUserStore = create((set) => ({
  username: "",
  email: "",
  setUsername: (newUsername) => set({ username:newUsername }),
  setEmail: (newEmail) => set({ email:newEmail })
}))