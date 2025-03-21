import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Wishlist } from "@/types";
import useUserStore from "@/store/user.store";
import apiClient from "@/api/client/apiClient";
import { getUserCookie } from "@/lib/cookie";

interface WishlistState {
  wishlist: Wishlist[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  fetchWishlist: () => Promise<void>;
}

const useWishlistStore = create<WishlistState, [["zustand/persist", WishlistState]]>(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: async (productId: string) => {
        try {
          const { token } = await getUserCookie();
          if (!token) {
            console.warn("User not authenticated. Cannot add to wishlist.");
            return;
          }

          const { wishlist } = get();
          const { user } = useUserStore.getState();
          if (!user) return;

          // Prevent duplicate entries
          if (!wishlist.some((item) => item.product_id === productId)) {
            const response = await apiClient.post<Wishlist>(
              `/api/wishlists/add/${productId}`,
              {}, // Empty request body
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            set({ wishlist: [...wishlist, response.data] });
          }
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      },

      removeFromWishlist: async (productId: string) => {
        try {
          const { token } = await getUserCookie();
          if (!token) {
            console.warn("User not authenticated. Cannot remove from wishlist.");
            return;
          }

          await apiClient.delete(`/api/wishlists/remove/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          set((state) => ({
            wishlist: state.wishlist.filter((item) => item.product_id !== productId),
          }));
        } catch (error) {
          console.error("Error removing from wishlist:", error);
        }
      },

      fetchWishlist: async () => {
        try {
          const { token } = await getUserCookie();
          if (!token) {
            console.warn("User not authenticated. Cannot fetch wishlist.");
            return;
          }

          const { user } = useUserStore.getState();
          if (!user) return;

          const response = await apiClient.get<Wishlist[]>("/api/wishlists", {
            headers: { Authorization: `Bearer ${token}` },
          });

          set({ wishlist: response.data });
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      },
    }),
    {
      name: "wishlist-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useWishlistStore;
