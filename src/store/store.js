import { create } from 'zustand'

export const useUserStore = create((set) => ({
  Username: "",
  Email: "",
  isLogin: false,
  SetIsLogin: (newIsLogin) => set({ isLogin: newIsLogin }),
  SetUsername: (newUsername) => set({username:newUsername}),
  SetEmail: (newEmail) => set({ email:newEmail })
}))
