import { create } from "zustand";

/**
 * Auth store for managing authentication state using Zustand.
 *
 * This store manages the user's authentication state and profile data.
 * It persists the user profile to localStorage upon login, and removes it on logout.
 *
 * @typedef {Object} AuthStore
 * @property {boolean} isLoggedIn - Indicates whether a user is logged in.
 * @property {Object|null} userProfile - The user profile object or null if not logged in.
 * @property {Function} setLogin - Function to set the user profile and mark the user as logged in.
 * @property {Function} setLogout - Function to clear the user profile and mark the user as logged out.
 *
 * @example
 * // To update login state:
 * useAuthStore.getState().setLogin({ name: "John Doe", email: "john@example.com" });
 *
 * // To log out:
 * useAuthStore.getState().setLogout();
 */
const savedProfile = localStorage.getItem("userProfile");
const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;

export const useAuthStore = create((set) => ({
  isLoggedIn: parsedProfile ? true : false,
  userProfile: parsedProfile,
  setLogin: (profile) => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    set({ isLoggedIn: true, userProfile: profile });
  },
  setLogout: () => {
    localStorage.removeItem("userProfile");
    set({ isLoggedIn: false, userProfile: null });
  },
}));
