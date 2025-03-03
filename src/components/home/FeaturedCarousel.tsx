"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import useFetch from "@/hooks/useFetch";
import { FeaturedOffering } from "@/types";
import Image from "next/image";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import { useEffect, useState } from "react";

export default function FeaturedCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const {
    data: featuredOffering,
    loading,
    error,
  } = useFetch<FeaturedOffering[]>("/featured");

  return (
    <div className="relative">
      {loading ? (
        <div className="h-full w-full bg-gray-300 animate-pulse"></div>
      ) : (
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full max-w-[40rem]"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <div className="w-full z-50 absolute bottom-[30px] flex justify-center">
            <div className="flex flex-row gap-[8px]">
              {Array?.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`${
                    current === index + 1
                      ? "bg-sheerpeace-purple-secondary"
                      : "bg-gray-200"
                  } w-3 h-3 rounded-full`}
                ></button>
              ))}
            </div>
          </div>

          <CarouselContent>
            {featuredOffering?.map((featured, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-square items-center justify-center p-0 h-[350px] w-full overflow-hidden">
                      <Image
                        src={renderImageUrl(featured.image_url)}
                        alt={featured.title}
                        height={500}
                        width={500}
                        className="object-cover w-full h-full"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-[30px] transform -translate-y-1/2">
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
          <CarouselNext className="absolute top-1/2 right-[30px] transform -translate-y-1/2">
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
      )}
    </div>
  );
}
