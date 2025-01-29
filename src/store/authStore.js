import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  userProfile: null,
  setLogin: (profile) => set({ isLoggedIn: true, userProfile: profile }),
  setLogout: () => set({ isLoggedIn: false, userProfile: null }),
}));
