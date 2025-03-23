import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  bannerImage?: string;
  establishedYear?: number;
  headquarters?: string;
  website?: string;
  contactEmail?: string;
  socialLinks?: Record<string, string>; // { facebook: "...", instagram: "..." }
  categories?: string[];
  featuredProducts?: string[];
  totalProducts?: number;
  averageRating?: number;
  totalReviews?: number;
  missionStatement?: string;
  values?: string[];
  isActive: boolean;
  created_at: string;
}

interface BrandStore {
  brands: Brand[];
  loading: boolean;
  error: string | null;

  fetchBrands: () => Promise<void>;
  addBrand: (brand: Brand) => void;
  updateBrand: (id: string, updatedBrand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
}

export const useBrandStore = create<BrandStore>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      brands: [],
      loading: false,
      error: null,

      fetchBrands: async () => {
        set({ loading: true });
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/brands`); // Adjust to your API endpoint
          const data: Brand[] = await res.data;
          set({ brands: data, loading: false });
        } catch (error) {
          console.error(error);
          set({ error: "Failed to fetch brands", loading: false });
        }
      },

      addBrand: (brand) => {
        set((state) => ({ brands: [...state.brands, brand] }));
      },

      updateBrand: (id, updatedBrand) => {
        set((state) => ({
          brands: state.brands.map((brand) =>
            brand.id === id ? { ...brand, ...updatedBrand } : brand
          ),
        }));
      },

      deleteBrand: (id) => {
        set((state) => ({
          brands: state.brands.filter((brand) => brand.id !== id),
        }));
      },
    }),
    {
      name: "brand-storage", // Local storage key for persistence
    }
  )
);
