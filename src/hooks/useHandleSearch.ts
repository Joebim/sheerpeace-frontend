import { useRouter } from "next/navigation";

const useHandleSearch = () => {
  const router = useRouter();
  const handleSearch = (query: string, searchType: string) => {
    if (!query.trim()) {
      console.log("Empty query, skipping search");
      return;
    }

    console.log("Search function called with query:", query);

    try {
      router.push(`/search?${searchType}=${encodeURIComponent(query)}`);
      console.log("Navigation to search page successful");
    } catch (error) {
      console.error("Error navigating to search page:", error);
    }
  };

interface HandleSearchSubmitEvent extends React.KeyboardEvent<HTMLInputElement> {
    preventDefault: () => void;
}

const handleSearchSubmit = (e: HandleSearchSubmitEvent, searchTerm: string) => {
    if (e.key === "Enter" && searchTerm.trim()) {
        e.preventDefault();
        router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
};

  return { handleSearch, handleSearchSubmit };
};

export default useHandleSearch;
