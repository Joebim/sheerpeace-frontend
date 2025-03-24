"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product/ProductCard";
import FilterBar from "./FilterBar";
import axios from "axios";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import { useWindowWidth } from "@/hooks/useWindowsWidth";
import DynamicDrawer from "./DynamicDrawer";
import { SlidersHorizontal } from "lucide-react";
import PaginationBar from "./Pagination";
import SearchHeader from "./SearchHeader";

interface PaginatedData {
  products: Product[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
  limit: number;
}

interface SearchApi {
  data: PaginatedData;
  success: boolean;
}

const fetchSearchResults = async (params: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/search?${params}`
  );
  if (res.status !== 200) throw new Error("Failed to fetch search results");
  return res.data;
};

const SearchPage = () => {
  const searchParams = useSearchParams();

  const paramsString = searchParams.toString(); // Convert searchParams to a string
  const { isDesktop } = useWindowWidth();

  const { data: results, isLoading } = useQuery<SearchApi>({
    queryKey: ["searchResults", paramsString], // Include all search parameters
    queryFn: () => fetchSearchResults(paramsString),
    enabled: !!paramsString, // Ensure query runs only when there are params
  });

  return (
    <div className="flex flex-col gap-[20px] sm:px-12 px-[20px] py-[25px] w-full">
      <SearchHeader />
      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="sm:w-[240px]">
          {isDesktop ? (
            <div className="bg-white p-[25px] rounded-lg shadow-md mb-6 sticky top-[130px] overflow-y-auto h-[70vh]">
              <FilterBar />
            </div>
          ) : (
            <DynamicDrawer
              trigger={
                <>
                  <SlidersHorizontal />
                  <span>Filter</span>
                </>
              }
            >
              <div className="max-h-[450px] p-[25px] overflow-y-auto">
                <FilterBar />
              </div>
            </DynamicDrawer>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : results?.data?.products?.length ? (
          <div className="flex flex-col gap-[20px] flex-[5]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4 sm:min-h-[180vh]">
              {results?.data?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <PaginationBar
              totalPages={results.data.totalPages}
              currentPage={results.data.page}
            />
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
