"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product/ProductCard";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";
import axios from "axios";
import { Product } from "@/types";

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

const fetchSearchResults = async (query: string) => {
  const res = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/products/search?name=${encodeURIComponent(query)}`
  );
  if (res.status !== 200) throw new Error("Failed to fetch search results");
  return res.data;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: results, isLoading } = useQuery<SearchApi>({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query),
    enabled: !!query,
  });

  return (
    <div className="container mx-[30px] p-6 w-full">
      <h1 className="text-2xl font-semibold">Search Results</h1>

      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="flex-[1]">
          <FilterBar />
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : results?.data?.products?.length ? (
          <div className="flex flex-col gap-[2p0x] flex-[5]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
              {results?.data?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
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
