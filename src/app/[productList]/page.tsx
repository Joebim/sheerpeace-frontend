"use client";

import { usePathname } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import Pagination from "@/app/search/components/Pagination";
import { useProductStore } from "@/store/product.store";
import { Product } from "@/types";

const DynamicListPage = () => {
  const pathname = usePathname(); // Get the current route

  const { loading, trending, isNew, topSelling, topChoice, isFeatured } =
    useProductStore();

  // Map the route to the correct product store key
  const productMap: Record<string, { title: string; data: Product[] }> = {
    "/trending": { title: "Trending Products", data: trending },
    "/is_new": { title: "New Arrivals", data: isNew },
    "/top_selling": { title: "Top Selling", data: topSelling },
    "/top_choice": { title: "Top Choices", data: topChoice },
    "/is_featured": { title: "Featured Products", data: isFeatured },
  };

  // Get the correct product data and heading based on the route
  const productInfo = productMap[pathname] || { title: "Products", data: [] };

  return (
    <div className="flex flex-col gap-[20px] sm:px-12 px-[20px] py-[25px] w-full">
      {/* Dynamic Heading */}
      <h1 className="text-2xl font-semibold text-gray-800">{productInfo.title}</h1>

      {loading ? (
        <p>Loading...</p>
      ) : productInfo.data?.length ? (
        <div className="flex flex-col gap-[20px] flex-[5]">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4">
            {productInfo.data.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination totalPages={1} currentPage={1} />
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default DynamicListPage;
