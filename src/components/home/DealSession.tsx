import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import DealCard from "./DealCard";
import DealSkeleton from "./DealSkeleton";

interface DealSessionProps {
  products: Product[] | undefined;
  dealTitle: string; // Replace 'any' with the appropriate type if known
  loading: boolean;
}

export default function DealSession({
  products,
  dealTitle,
  loading,
}: DealSessionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [dealLoading, setDealLoading] = useState(true);

  useEffect(() => {
    setDealLoading(loading);
  }, [loading]);

  return (
    <div className="flex flex-col gap-[10px] w-full">
      <div className="w-full flex flex-row justify-between border-b border-sheerpeace-black pb-[10px]">
        <div className="bg-sheerpeace-black text-white text-[13px] px-[15px] py-[5px] rounded-[10px] self-start">
          {dealTitle}
        </div>

        <div className="flex flex-row gap-[10px] items-center">
          <button onClick={() => api?.scrollPrev()} aria-label="Previous">
            <CircleArrowLeft className="text-gray-500" />
          </button>
          <button onClick={() => api?.scrollNext()} aria-label="Next">
            <CircleArrowRight className="text-gray-500" />
          </button>
        </div>
      </div>
      {dealLoading ? (
        <Carousel setApi={setApi} className="w-full max-w-full">
          <CarouselContent>
            {[1, 2].map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <div className="p-1">
                  <Card className="shadow-none border-none">
                    <CardContent className="flex items-center justify-center p-0">
                      <DealSkeleton />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <Carousel setApi={setApi} className="w-full max-w-[60rem]">
          <CarouselContent>
            {products?.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <div className="p-1">
                  <Card className="shadow-none border-none">
                    <CardContent className="flex items-center justify-center p-0">
                      <DealCard product={product} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
