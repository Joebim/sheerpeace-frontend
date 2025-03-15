import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getJwt } from "@/lib/cookie";
import { CartItem, CartData } from "@/types";
import apiClient from "@/api/client/apiClient";
import { toast } from "sonner";

export interface CartState {
  cart: CartData | null;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  removeItems: (ids: string[]) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  getCart: () => Promise<void>;
  synchronizeCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,

      addItem: async (item: CartItem) => {

        const token = await getJwt();
        if (!token) {
          console.warn("User not authenticated. Adding item locally.");
        }

        const currentCart: CartData = get().cart || {
          user_id: "",
          created_at: "",
          cartitem_ids: [],
          total_items: 0,
          total_price: "0",
          id: "",
          items: [],
        };

        // Check if the item already exists
        const existingItem = currentCart.items.find(
          (cartItem) => cartItem.product_id === item.product_id
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          currentCart.items.push(item);
          if (!token) {
            toast.success("Item added to cart", {
              description: `${item.quantity}x ${item.product.name}`,
            });
          }
        }

        // Update cart totals
        currentCart.total_items = currentCart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        currentCart.total_price = currentCart.items
          .reduce(
            (total, item) =>
              total +
              item.quantity *
                parseFloat(currentCart.total_price?.toString() || "0"),
            0
          )
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/carts/add`,
            {
              product_id: item.product_id,
              quantity: item.quantity,
              selected_sizes: item.selected_sizes.map((size) => size.id),
              selected_variants: item.selected_variants.map(
                (variant) => variant.id
              ),
              selected_colors: item.selected_colors.map((color) => color.id),
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          toast.success("Item added to cart", {
            description: `${item.quantity}x ${item.product.name}`,
          });
        } catch (error) {
          console.error("Failed to add item to API", error);
        }
      },

      removeItem: async (id: string) => {
        const token = await getJwt();
        if (!token)
          return console.warn("User not authenticated. Cannot remove item.");

        const currentCart = get().cart;
        if (!currentCart) return console.warn("Cart data is not available.");

        currentCart.items = currentCart.items.filter((item) => item.id !== id);
        currentCart.total_items = currentCart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        currentCart.total_price = currentCart.items
          .reduce(
            (total, item) =>
              total + item.quantity * parseFloat(currentCart.total_price),
            0
          )
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.delete(`/api/carts/remove/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Item removed from cart");
        } catch (error) {
          console.error("Failed to remove item from API", error);
        }
      },

      removeItems: async (ids: string[]) => {
        const token = await getJwt();
        if (!token)
          return console.warn("User not authenticated. Cannot remove items.");

        const currentCart = get().cart;
        if (!currentCart) return console.warn("Cart data is not available.");

        currentCart.items = currentCart.items.filter(
          (item) => item.id && !ids.includes(item.id)
        );
        currentCart.total_items = currentCart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        currentCart.total_price = currentCart.items
          .reduce(
            (total, item) =>
              total + item.quantity * parseFloat(currentCart.total_price),
            0
          )
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.post(
            `/api/carts/remove-multiple`,
            { ids },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          toast.success("Your cart has been cleared");
        } catch (error) {
          console.error("Failed to remove items from API", error);
        }
      },

      updateQuantity: async (id: string, quantity: number) => {
        const token = await getJwt();
        if (!token)
          return console.warn(
            "User not authenticated. Cannot update quantity."
          );

        const currentCart = get().cart;
        if (!currentCart) return console.warn("Cart data is not available.");

        const itemToUpdate = currentCart.items.find((item) => item.id === id);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }

        currentCart.total_items = currentCart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        currentCart.total_price = currentCart.items
          .reduce(
            (total, item) =>
              total + item.quantity * parseFloat(currentCart.total_price),
            0
          )
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.put(
            `/api/carts/update/${id}`,
            { quantity },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error("Failed to update item quantity in API", error);
        }
      },

      getCart: async () => {
        const token = await getJwt();
        if (!token)
          return console.warn("User not authenticated. Cannot fetch cart.");

        try {
          const response = await apiClient.get<CartData>(`/api/carts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ cart: response.data });
        } catch (error) {
          console.error("Failed to fetch cart from API", error);
        }
      },

      synchronizeCart: async () => {
        const token = await getJwt();
        if (!token) {
          console.warn("User not authenticated. Cannot synchronize cart.");
          return;
        }

        const localCart = get().cart;

        try {
          // Fetch latest cart from API
          const response = await apiClient.get<CartData>(`/api/carts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const apiCart = response.data;

          if (!localCart) {
            set({ cart: apiCart });
            return;
          }

          // Merge local cart with API cart
          const mergedItems: CartItem[] = [];

          // Create a map for API cart items
          const apiCartMap = new Map<string, CartItem>();
          for (const apiItem of apiCart.items) {
            apiCartMap.set(apiItem.product_id, apiItem);
          }

          for (const localItem of localCart.items) {
            const apiItem = apiCartMap.get(localItem.product_id);
            if (apiItem) {
              // Update quantity to the max and merge attributes
              apiItem.quantity = Math.max(localItem.quantity, apiItem.quantity);
              apiItem.selected_sizes =
                localItem.selected_sizes || apiItem.selected_sizes;
              apiItem.selected_variants =
                localItem.selected_variants || apiItem.selected_variants;
              apiItem.selected_colors =
                localItem.selected_colors || apiItem.selected_colors;
            }
            // Push merged item
            mergedItems.push(apiItem || localItem);
            apiCartMap.delete(localItem.product_id); // Remove processed item
          }

          // Add remaining API items not in local cart
          mergedItems.push(...apiCartMap.values());

          // Compute updated total items and price
          const totalItems = mergedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          const totalPrice = mergedItems.reduce(
            (sum, item) =>
              sum +
              item.quantity * parseFloat(item.product.price?.toString() || "0"),
            0
          );

          const reconciledCart: CartData = {
            ...localCart,
            items: mergedItems,
            total_items: totalItems,
            total_price: totalPrice.toFixed(2),
          };

          // Sync updated cart with backend
          await apiClient.post(
            `/api/carts/sync`,
            { cart: reconciledCart },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Update Zustand store
          set({ cart: reconciledCart });
        } catch (error) {
          console.error("Failed to synchronize cart with API", error);
        }
      },
    }),
    {
      name: "cart-storage",
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
