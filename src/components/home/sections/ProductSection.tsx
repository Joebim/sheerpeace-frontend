"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import ProductCardLite from "@/components/product/ProductCardLite";
import { Product } from "@/types";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

interface ProductSectionProps {
  headerTitle: string;
  products: Product[] | undefined;
  loading: boolean | undefined;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  headerTitle,
  products,
  loading,
}) => {
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    setProductLoading(loading ?? true);
  }, [loading]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[13px] sm:text-[18px]  font-bold text-center self-start">
            {headerTitle}
          </h2>
          <div className="flex flex-row gap-[10px] items-center">
            <span className="font-bold text-[14px]">See More</span>
            <div className="h-[25px] w-[25px] rounded-full bg-primary-100 flex justify-center items-center">
              <ArrowRight className="text-light w-[17px]" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <Carousel className="w-full max-w-full">
            <CarouselContent className="-ml-1">
              {productLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <ProductCardSkeleton />
                    </CarouselItem>
                  ))
                : products?.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="basis-1/3 md:basis-1/4 lg:basis-1/5"
                    >
                      <ProductCardLite product={product} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-[20px] transform -translate-y-1/2">
              <button className="bg-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 right-[20px] transform -translate-y-1/2">
              <button className="bg-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
