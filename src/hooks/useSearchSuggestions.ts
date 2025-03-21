import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useSearchStore } from "@/store/search.store";
import { SearchSuggestion } from "@/types";

const fetchSearchSuggestions = async (
  term: string
): Promise<SearchSuggestion[]> => {
  if (!term.trim()) return [];
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search?term=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
};

export const useSearchSuggestions = (term: string) => {
  const setSuggestions = useSearchStore((state) => state.setSuggestions);

  return useQuery<SearchSuggestion[], Error>(
    {
      queryKey: ["searchSuggestions", term],
      queryFn: () => fetchSearchSuggestions(term),
      enabled: !!term.trim(),
      staleTime: 300000, // 5 minutes
      onSuccess: (data: SearchSuggestion[]) => {
        setSuggestions(data);
      },
    } as UseQueryOptions<SearchSuggestion[], Error> // Explicitly casting options
  );
};
