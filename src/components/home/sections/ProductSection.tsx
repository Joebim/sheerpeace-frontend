"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";

interface ProductSectionProps {
  headerTitle: string;
  products: Product[] | undefined;
  loading: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  headerTitle,
  products,
  loading
}) => {
  return (
    <div className="px-[1.4rem] sm:px-[6.25rem]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl sm:text-2xl  font-bold text-centerself-start">
            {headerTitle}
          </h2>
          <div className="flex flex-row gap-[10px] items-center">
            <span className="font-bold">See More</span>
            <div className="h-[25px] w-[25px] rounded-full bg-primary-100 flex justify-center items-center">
              <ArrowRight className="text-light w-[17px]" />
            </div>
          </div>
        </div>

        <div className="w-full">
          <Carousel className="w-full max-w-full">
            <CarouselContent className="-ml-1">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                    >
                      <ProductCardSkeleton />
                    </CarouselItem>
                  ))
                : products?.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="basis-1/2 md:basis-1/4 lg:basis-1/5"
                    >
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
