import { create } from "zustand";
import { SearchSuggestion } from "@/types";

interface SearchState {
  term: string;
  suggestions: SearchSuggestion[];
  loading: boolean;
  setTerm: (term: string) => void;
  setSuggestions: (suggestions: SearchSuggestion[]) => void;
  fetchSuggestions: () => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  term: "",
  suggestions: [],
  loading: false,

  setTerm: (term) => set({ term }),

  setSuggestions: (suggestions) => set({ suggestions }),

  fetchSuggestions: async () => {
    // if (!term.trim()) {
    //   set({ suggestions: [], loading: false });
    //   return;
    // }

    set({ loading: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`);
      if (!res.ok) throw new Error("Failed to fetch suggestions");

      const data: SearchSuggestion[] = await res.json();
      set({ suggestions: data, loading: false });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      set({ loading: false });
    }
  },
}));
