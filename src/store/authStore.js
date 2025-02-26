import { create } from "zustand";

const savedProfile = localStorage.getItem("userProfile");
const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;

export const useAuthStore = create((set) => ({
  isLoggedIn: parsedProfile ? true : false,
  userProfile: parsedProfile,
  setLogin: (profile) => {
    console.log("setLogin: Storing profile with token:", profile.accessToken);
    localStorage.setItem("userProfile", JSON.stringify(profile));
    set({ isLoggedIn: true, userProfile: profile });
  },
  setLogout: () => {
    localStorage.removeItem("userProfile");
    set({ isLoggedIn: false, userProfile: null });
  },
}));
