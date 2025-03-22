import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserCookie } from "@/lib/cookie";
import { CartItem, CartData } from "@/types";
import apiClient from "@/api/client/apiClient";
import { toast } from "sonner";

export interface CartState {
  cart: CartData | null;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  removeItems: (productIds: string[]) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  getCartAndSync: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,

      addItem: async (item: CartItem) => {
        const { token } = await getUserCookie();
        if (!token) {
          console.warn("User not authenticated. You can add item locally.");
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

        // Check if the item exists in the cart
        const existingItem = currentCart.items.find(
          (cartItem) => cartItem.product_id === item.product_id
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          currentCart.items.push(item);
        }

        // Update totals
        currentCart.total_items = currentCart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        currentCart.total_price = currentCart.items
          .reduce(
            (total, item) =>
              total +
              item.quantity * parseFloat(item.product.price?.toString() || "0"),
            0
          )
          .toFixed(2);

        set({ cart: { ...currentCart } });

        toast.success("Item added to cart", {
          description: `${item.quantity}x ${item.product.name}`,
        });

        // If logged in, sync with the backend
        if (token) {
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
          } catch (error) {
            console.error("Failed to add item to API", error);
          }
        }
      },

      removeItem: async (productId: string) => {
        const { token } = await getUserCookie();
        if (!token) {
          console.warn("User not authenticated. You can remove item locally");
        }
        const { cart } = get();
        if (!cart) {
          console.warn("Cart data is not available.");
          return;
        }

        // Remove item locally using productId
        cart.items = cart.items.filter((item) => item.product.id !== productId);
        cart.total_items = cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cart.total_price = cart.items
          .reduce(
            (total, item) =>
              total + item.quantity * parseFloat(item.product.price.toString()),
            0
          )
          .toFixed(2);

        set({ cart: { ...cart } });

        toast.success("Item removed from cart");

        // Sync with backend only if logged in
        if (token) {
          try {
            await apiClient.delete(`/api/carts/remove/${productId}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Item removed from server cart");
          } catch (error) {
            console.error("Failed to remove item from API", error);
          }
        }
      },
      removeItems: async (productIds: string[]) => {
        const { token } = await getUserCookie();
        if (!token) {
          console.warn("User not authenticated.You can remove items locally.");
        }
        const { cart } = get();
        if (!cart) {
          console.warn("Cart data is not available.");
          return;
        }

        // Remove items locally using productId
        cart.items = cart.items.filter(
          (item) => !productIds.includes(item.product.id)
        );
        cart.total_items = cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cart.total_price = cart.items
          .reduce(
            (total, item) =>
              total + item.quantity * parseFloat(item.product.price.toString()),
            0
          )
          .toFixed(2);

        set({ cart: { ...cart } });

        toast.success("Items removed from cart");

        // Sync with backend only if logged in
        if (token) {
          try {
            const filteredProductIds = productIds.filter((id) => id !== null);
            if (filteredProductIds.length > 0) {
              await apiClient.post(
                `/api/carts/remove-multiple`,
                { ids: filteredProductIds },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              console.log("Items removed from server cart");
            }
          } catch (error) {
            console.error("Failed to remove items from API", error);
          }
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        const { token } = await getUserCookie();
        if (!token) {
          console.warn(
            "User not authenticated. Youc can update quantity locally"
          );
        }
        const { cart } = get();

        if (!cart) {
          console.warn("Cart data is not available.");
          return;
        }

        console.log("Current cart:", cart);

        // Find item using productId for offline updates
        const updatedItems = cart.items.find(
          (item) => item.product.id === productId
        );

        if (updatedItems) {
          updatedItems.quantity = quantity;
        }

        // Recalculate totals
        cart.total_items = cart.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        cart.total_price = cart.items
          .reduce(
            (total, item) =>
              total + item.quantity * parseFloat(item.product.price.toString()),
            0
          )
          .toFixed(2);

        // Update Zustand state
        set({
          cart: {
            ...cart,
          },
        });

        console.log("Updated cart:", get().cart);
        toast.success("Cart updated");

        // Sync with backend only if logged in
        if (token) {
          try {
            await apiClient.put(
              `/api/carts/update/${productId}`,
              { product_id: productId, quantity },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            console.log("Cart updated on server");
          } catch (error) {
            console.error("Failed to update item quantity in API", error);
          }
        }
      },
      getCartAndSync: async () => {
        const { token } = await getUserCookie();
        if (!token)
          return console.warn("User not authenticated. Cannot fetch cart.");

        try {
          // Fetch cart from the backend
          const response = await apiClient.get<CartData>(`/api/carts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const serverCart = response.data;
          const localCart = get().cart;

          // Check if carts are identical (same product_id, quantity, and total_price)
          const isSameCart = (cartA: CartData, cartB: CartData) => {
            if (cartA.items.length !== cartB.items.length) return false;

            return cartA.items.every((itemA) => {
              const itemB = cartB.items.find(
                (i) => i.product_id === itemA.product_id
              );
              return (
                itemB &&
                itemA.quantity === itemB.quantity &&
                parseFloat(cartA.total_price) === parseFloat(cartB.total_price)
              );
            });
          };

          if (localCart && isSameCart(localCart, serverCart)) {
            console.log(
              "Local cart is identical to the server cart. No sync needed."
            );
            return set({ cart: serverCart });
          }

          // If the server cart is empty, send the local cart
          if (!serverCart || serverCart.items.length === 0) {
            console.log("No existing server cart, sending local cart.");
            await apiClient.post(
              `/api/carts/sync`,
              { cart: localCart },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return set({ cart: localCart });
          }

          // Merge carts (prioritizing local cart quantities)
          const mergedItemsMap = new Map<string, CartItem>();

          // Add server cart items first
          for (const item of serverCart.items) {
            mergedItemsMap.set(item.product_id, { ...item });
          }

          // Merge local cart items
          for (const item of localCart?.items || []) {
            if (mergedItemsMap.has(item.product_id)) {
              const existingItem = mergedItemsMap.get(item.product_id)!;
              existingItem.quantity = item.quantity; // Prioritize local quantity
            } else {
              mergedItemsMap.set(item.product_id, { ...item });
            }
          }

          // Convert merged items map back to an array
          const mergedCartItems = Array.from(mergedItemsMap.values());

          // Calculate totals
          const mergedCart: CartData = {
            ...serverCart,
            items: mergedCartItems,
            total_items: mergedCartItems.reduce(
              (total, item) => total + item.quantity,
              0
            ),
            total_price: mergedCartItems
              .reduce(
                (total, item) =>
                  total +
                  item.quantity * parseFloat(item.product.price.toString()),
                0
              )
              .toFixed(2),
          };

          // Send merged cart to the backend
          await apiClient.post(
            `/api/carts/sync`,
            { cart: mergedCart },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log("Cart synchronized successfully");
          set({ cart: mergedCart });
        } catch (error) {
          console.error("Failed to fetch and sync cart from API", error);
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
