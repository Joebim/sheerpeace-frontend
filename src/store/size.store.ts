import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Size {
  id: string;
  label: string;
  gender: "male" | "female";
  chest?: number;
  waist?: number;
  hips?: number;
  description?: string;
  created_at: string;
}

interface SizeStore {
  sizes: Size[];
  loading: boolean;
  error: string | null;

  fetchSizes: () => Promise<void>;
  addSize: (size: Size) => void;
  updateSize: (id: string, updatedSize: Partial<Size>) => void;
  deleteSize: (id: string) => void;
}

export const useSizeStore = create<SizeStore>()(
  persist(
    (set) => ({
      sizes: [],
      loading: false,
      error: null,

      fetchSizes: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/sizes`
          ); // Update with your API endpoint
          const data: Size[] = await res.data;
          set({ sizes: data, loading: false });
        } catch (error) {
          const axiosError = error as AxiosError;
          set({
            error: `An unexpected error occurred: ${axiosError}`,
            loading: false,
          });
        }
      },

      addSize: (size) => {
        set((state) => ({ sizes: [...state.sizes, size] }));
      },

      updateSize: (id, updatedSize) => {
        set((state) => ({
          sizes: state.sizes.map((size) =>
            size.id === id ? { ...size, ...updatedSize } : size
          ),
        }));
      },

      deleteSize: (id) => {
        set((state) => ({
          sizes: state.sizes.filter((size) => size.id !== id),
        }));
      },
    }),
    {
      name: "size-storage", // Local storage key for persistence
    }
  )
);
