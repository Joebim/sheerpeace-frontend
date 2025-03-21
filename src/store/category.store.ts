import { create } from "zustand";
import axios from "axios";

export type Category = {
  id: string;
  name: string;
  image: string;
  created_at: string;
};

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Category[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
      set({ categories: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ error: "Failed to fetch categories", loading: false });
    }
  },
}));
