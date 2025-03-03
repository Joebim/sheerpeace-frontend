import { create } from "zustand";
import { setJwt, getJwt, removeJwt } from "@/lib/cookie";
import type { UserData } from "@/types";

type UserStore = {
  user: UserData | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
  setUser: (user: UserData) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  initialize: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  authToken: null,
  isAuthenticated: false,

  setAuthToken: (token) => {
    setJwt(token); // Store token in cookies
    set({ authToken: token, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    removeJwt(); // Clear JWT from cookies
    set({ user: null, authToken: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    const token = await getJwt(); // Retrieve JWT from cookies
    if (!token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const user: UserData = await response.json(); // Directly store the user data
        set({ user, authToken: token, isAuthenticated: true });
      } else if (response.status === 401) {
        useUserStore.getState().logout();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      useUserStore.getState().logout();
    }
  },

  initialize: async () => {
    const token = await getJwt(); // Check for existing JWT
    if (token) {
      await useUserStore.getState().fetchUser(); // Fetch user data if JWT is valid
    }
  },
}));

export default useUserStore;
