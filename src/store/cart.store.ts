import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { getJwt } from '@/lib/cookie';
import { CartState, CartItem, CartData } from '@/types';
import apiClient from '@/api/client/apiClient';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,

      addItem: async (item: CartItem) => {
        const token = await getJwt();
        if (!token) {
          console.warn('User not authenticated. Adding item locally.');
        }

        const currentCart: CartData = get().cart || {
          user_id: '',
          created_at: '',
          cartitem_ids: [],
          total_items: 0,
          total_price: '0',
          id: '',
          items: [],
        };

        // Check if the item already exists
        const existingItem = currentCart.items.find((cartItem) => cartItem.product_id === item.product_id);

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          currentCart.items.push(item);
        }

        // Update cart totals
        currentCart.total_items = currentCart.items.reduce((total, item) => total + item.quantity, 0);
        currentCart.total_price = currentCart.items
          .reduce((total, item) => total + item.quantity * parseFloat(currentCart.total_price), 0)
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.post(
            `/api/cart/add`,
            {
              product_id: item.product_id,
              quantity: item.quantity,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error('Failed to add item to API', error);
        }
      },

      removeItem: async (id: string) => {
        const token = await getJwt();
        if (!token) return console.warn('User not authenticated. Cannot remove item.');

        const currentCart = get().cart;
        if (!currentCart) return console.warn('Cart data is not available.');

        currentCart.items = currentCart.items.filter((item) => item.id !== id);
        currentCart.total_items = currentCart.items.reduce((total, item) => total + item.quantity, 0);
        currentCart.total_price = currentCart.items
          .reduce((total, item) => total + item.quantity * parseFloat(currentCart.total_price), 0)
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await axios.delete(`/api/cart/remove/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          console.error('Failed to remove item from API', error);
        }
      },

      removeItems: async (ids: string[]) => {
        const token = await getJwt();
        if (!token) return console.warn('User not authenticated. Cannot remove items.');

        const currentCart = get().cart;
        if (!currentCart) return console.warn('Cart data is not available.');

        currentCart.items = currentCart.items.filter((item) => !ids.includes(item.id));
        currentCart.total_items = currentCart.items.reduce((total, item) => total + item.quantity, 0);
        currentCart.total_price = currentCart.items
          .reduce((total, item) => total + item.quantity * parseFloat(currentCart.total_price), 0)
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.post(
            `/api/cart/remove-multiple`,
            { ids },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error('Failed to remove items from API', error);
        }
      },

      updateQuantity: async (id: string, quantity: number) => {
        const token = await getJwt();
        if (!token) return console.warn('User not authenticated. Cannot update quantity.');

        const currentCart = get().cart;
        if (!currentCart) return console.warn('Cart data is not available.');

        const itemToUpdate = currentCart.items.find((item) => item.id === id);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }

        currentCart.total_items = currentCart.items.reduce((total, item) => total + item.quantity, 0);
        currentCart.total_price = currentCart.items
          .reduce((total, item) => total + item.quantity * parseFloat(currentCart.total_price), 0)
          .toFixed(2);

        set({ cart: { ...currentCart } });

        try {
          await apiClient.post(
            `/api/cart/update`,
            { id, quantity },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error('Failed to update item quantity in API', error);
        }
      },

      getCart: async () => {
        const token = await getJwt();
        if (!token) return console.warn('User not authenticated. Cannot fetch cart.');

        try {
          const response = await apiClient.get<CartData>(`/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ cart: response.data });
        } catch (error) {
          console.error('Failed to fetch cart from API', error);
        }
      },

      synchronizeCart: async () => {
        const token = await getJwt();
        if (!token) return console.warn('User not authenticated. Cannot synchronize cart.');

        const localCart = get().cart;

        try {
          const response = await apiClient.get<CartData>(`/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const apiCart = response.data;

          if (!localCart) {
            set({ cart: apiCart });
            return;
          }

          // Merge cart data
          localCart.items = [...new Set([...localCart.items, ...apiCart.items])];

          set({ cart: localCart });

          await apiClient.post(
            `/api/cart/sync`,
            { cart: localCart },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (error) {
          console.error('Failed to synchronize cart with API', error);
        }
      },
    }),
    {
      name: 'cart-storage',
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
