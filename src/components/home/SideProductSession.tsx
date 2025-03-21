"use client";

import { Product } from "@/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import SideProductCard from "./SideProductCard";
import SideProductSkeleton from "./SideProductSkeleton";

interface SideProductSessionProps {
  title: string;
  products: Product[] | undefined;
  loading: boolean;
}

export default function SideProductSession({
  title,
  products,
  loading,
}: SideProductSessionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [sideProductLoading, setSideProductLoading] = useState(true);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCountAndCurrent = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCountAndCurrent();
    api.on("select", updateCountAndCurrent);

    return () => {
      api.off("select", updateCountAndCurrent);
    };
  }, [api]);

  const chunkedProducts = products ? chunkArray(products, 4) : [];

  useEffect(() => {
    setSideProductLoading(loading);
  }, [loading]);

  return (
    <div className="flex flex-col gap-[15px] w-full">
      <div className="flex flex-row justify-between items-center border-b  pb-[8px]">
        <span className="text-[13px] font-bold">
          {title.toLocaleUpperCase()}
        </span>

        <div className="flex flex-row gap-[8px]">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`${
                current === index + 1
                  ? "bg-sheerpeace-purple-secondary w-5"
                  : "bg-gray-400 w-2"
              } h-2 rounded-full duration-300`}
            ></button>
          ))}
        </div>
      </div>

      <Carousel setApi={setApi} className="w-full max-w-[200px]">
        <CarouselContent>
          {sideProductLoading ? (
            <CarouselItem className="basis-1/1">
              <div className="flex flex-col gap-4 w-[200px]">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="shadow-none border-none">
                    <CardContent className="flex items-center justify-center p-0">
                      <SideProductSkeleton />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CarouselItem>
          ) : (
            chunkedProducts.map((productChunk, index) => (
              <CarouselItem key={index} className="basis-1/1">
                <div className="flex flex-col gap-4 w-[200px]">
                  {productChunk.map((product, productIndex) => (
                    <Card
                      key={productIndex}
                      className="shadow-none border-none"
                    >
                      <CardContent className="flex items-center justify-center p-0">
                        <SideProductCard product={product} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
}
