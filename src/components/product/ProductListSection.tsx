import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface ProductListSectionProps {
  products: Product[];
  headerTitle: string;
}

export default function ProductListSection({
  products,
  headerTitle,
}: ProductListSectionProps) {
  return (
    <>
      <div className="flex flex-col gap-[20px] w-full">
        <h1 className="text-[20px] font-bold">{headerTitle}</h1>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
