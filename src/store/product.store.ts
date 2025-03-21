import { create } from "zustand";
import { Product } from "@/types"; // Adjust the path if needed
import axios from "axios";

interface ProductStore {
  products: Product[];
  isFeatured: Product[];
  trending: Product[];
  isNew: Product[];
  topSelling: Product[];
  topChoice: Product[];
  totalViewed: number;
  totalLiked: number;
  loading: boolean;
  variantLoading: {
    isFeatured: boolean;
    trending: boolean;
    isNew: boolean;
    topSelling: boolean;
    topChoice: boolean;
  };
  error: string | null;

  // Fetch Products
  fetchProducts: (
    filters?: Record<string, string | number | boolean>
  ) => Promise<void>;

  // Fetch Specific Variants
  fetchFeatured: () => Promise<void>;
  fetchTrending: () => Promise<void>;
  fetchNew: () => Promise<void>;
  fetchTopSelling: () => Promise<void>;
  fetchTopChoice: () => Promise<void>;

  // Update Views
  updateProductView: (productId: string) => Promise<void>;
  updateTotalViewed: (count: number) => void;

  // Update Likes (Local Only for Now)
  updateTotalLiked: (count: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isFeatured: [],
  trending: [],
  isNew: [],
  topSelling: [],
  topChoice: [],
  totalViewed: 0,
  totalLiked: 0,
  loading: false,
  variantLoading: {
    isFeatured: false,
    trending: false,
    isNew: false,
    topSelling: false,
    topChoice: false,
  },
  error: null,

  // Fetch Products with Filters
  fetchProducts: async (filters = {}) => {
    set({ loading: true, error: null });

    try {
      const queryString = new URLSearchParams(
        Object.entries(filters).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString();

      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/query?${queryString}`);
      set({ products: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  // Fetch Specific Product Variants
  fetchFeatured: async () => {
    set((state) => ({ variantLoading: { ...state.variantLoading, isFeatured: true } }));
    try {
      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/query?isFeatured=true`);
      set({
        isFeatured: response.data,
        variantLoading: { ...get().variantLoading, isFeatured: false },
      });
    } catch (error) {
      console.error("Error fetching featured products:", error);
      set({ variantLoading: { ...get().variantLoading, isFeatured: false } });
    }
  },

  fetchTrending: async () => {
    set((state) => ({ variantLoading: { ...state.variantLoading, trending: true } }));
    try {
      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/query?trending=true`);
      set({
        trending: response.data,
        variantLoading: { ...get().variantLoading, trending: false },
      });
    } catch (error) {
      console.error("Error fetching trending products:", error);
      set({ variantLoading: { ...get().variantLoading, trending: false } });
    }
  },

  fetchNew: async () => {
    set((state) => ({ variantLoading: { ...state.variantLoading, isNew: true } }));
    try {
      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/query?isNew=true`);
      set({
        isNew: response.data,
        variantLoading: { ...get().variantLoading, isNew: false },
      });
    } catch (error) {
      console.error("Error fetching new products:", error);
      set({ variantLoading: { ...get().variantLoading, isNew: false } });
    }
  },

  fetchTopSelling: async () => {
    set((state) => ({ variantLoading: { ...state.variantLoading, topSelling: true } }));
    try {
      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/query?topSelling=true`);
      set({
        topSelling: response.data,
        variantLoading: { ...get().variantLoading, topSelling: false },
      });
    } catch (error) {
      console.error("Error fetching top selling products:", error);
      set({ variantLoading: { ...get().variantLoading, topSelling: false } });
    }
  },

  fetchTopChoice: async () => {
    set((state) => ({ variantLoading: { ...state.variantLoading, topChoice: true } }));
    try {
      const response = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/query?topChoice=true`);
      set({
        topChoice: response.data,
        variantLoading: { ...get().variantLoading, topChoice: false },
      });
    } catch (error) {
      console.error("Error fetching top choice products:", error);
      set({ variantLoading: { ...get().variantLoading, topChoice: false } });
    }
  },

  // Update Product Views in Both Local State and Backend
  updateProductView: async (productId) => {
    try {
      // Update in backend
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productId}/views`);

      // Update in Zustand store
      set((state) => {
        const updatedProducts = state.products.map((product) =>
          product.id === productId
            ? { ...product, views: product.views + 1 }
            : product
        );
        return {
          products: updatedProducts,
          totalViewed: state.totalViewed + 1,
        };
      });

      console.log(`View updated for product ${productId}`);
    } catch (error) {
      console.error("Error updating product views:", error);
    }
  },

  // Update Total Viewed Locally
  updateTotalViewed: (count) =>
    set((state) => ({ totalViewed: state.totalViewed + count })),

  // Update Total Liked Locally (Can be expanded to update backend)
  updateTotalLiked: (count) =>
    set((state) => ({ totalLiked: state.totalLiked + count })),
}));
