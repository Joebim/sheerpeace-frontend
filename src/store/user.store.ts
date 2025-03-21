import { create } from "zustand";
import { setUserCookie, getUserCookie, removeUserCookie } from "@/lib/cookie";
import type { UserData } from "@/types";

interface UserDetails {
  token: string
  user: UserData
}

type UserStore = {
  user: UserData | null;
  authToken: string | null;
  isAuthenticated: boolean;
  setAuthUser: (userCookies: UserDetails) => void;
  setUser: (user: UserData) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  initialize: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  authToken: null,
  isAuthenticated: false,

  setAuthUser: (userCookies) => {
    setUserCookie(userCookies); 
    set({ authToken: userCookies.token, isAuthenticated: true });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    removeUserCookie(); // Clear User from cookies
    set({ user: null, authToken: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    const { token } = await getUserCookie(); 

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
    const { token } = await getUserCookie();

    if (token) {
      await useUserStore.getState().fetchUser(); // Fetch user data if User is valid
    }
  },
}));

export default useUserStore;
