import { create } from "zustand";
import axios from "axios";

export type SubCategory = {
  id: string;
  name: string;
  category_id: string;
  image: string;
  created_at: string;
};

interface SubCategoryStore {
  subcategories: SubCategory[];
  loading: boolean;
  error: string | null;

  fetchSubCategories: (categoryId?: string) => Promise<void>;
}

export const useSubCategoryStore = create<SubCategoryStore>((set) => ({
  subcategories: [],
  loading: false,
  error: null,

  fetchSubCategories: async (categoryId) => {
    set({ loading: true, error: null });
    try {
      const query = categoryId ? `?category_id=${categoryId}` : "";
      const response = await axios.get<SubCategory[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subcategories${query}`);
      set({ subcategories: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      set({ error: "Failed to fetch subcategories", loading: false });
    }
  },
}));
