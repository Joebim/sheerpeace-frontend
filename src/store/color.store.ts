import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Color {
  id: string;
  name: string;
  hex: string;
  created_at: string;
}

interface ColorStore {
  colors: Color[];
  loading: boolean;
  error: string | null;

  fetchColors: () => Promise<void>;
  addColor: (color: Color) => void;
  updateColor: (id: string, updatedColor: Partial<Color>) => void;
  deleteColor: (id: string) => void;
}

export const useColorStore = create<ColorStore>()(
  persist(
    (set) => ({
      colors: [],
      loading: false,
      error: null,

      fetchColors: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/colors`); // Update with your API endpoint
          const data: Color[] = await res.data;
          set({ colors: data, loading: false });
        } catch (error) {
          const axiosError = error as AxiosError;
          set({
            error: `Failed to fetch colors: ${axiosError}`,
            loading: false,
          });
        }
      },

      addColor: (color) => {
        set((state) => ({ colors: [...state.colors, color] }));
      },

      updateColor: (id, updatedColor) => {
        set((state) => ({
          colors: state.colors.map((color) =>
            color.id === id ? { ...color, ...updatedColor } : color
          ),
        }));
      },

      deleteColor: (id) => {
        set((state) => ({
          colors: state.colors.filter((color) => color.id !== id),
        }));
      },
    }),
    {
      name: "color-storage", // Local storage key for persistence
    }
  )
);
