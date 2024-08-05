import { create } from 'zustand'

export const useUserStore = create((set) => ({
  Username: "",
  Email: "",
  UserId: "",
  isLogin: false,
  currentChatUser: "",
  setCurrentChatUser: (user) => set({ currentChatUser: user }),
  SetIsLogin: (newIsLogin) => set({ isLogin: newIsLogin }),
  SetUsername: (newUsername) => set({Username:newUsername}),
  SetEmail: (newEmail) => set({ Email:newEmail }),
  SetUserId: (newId) => set({ UserId:newId })
}))
