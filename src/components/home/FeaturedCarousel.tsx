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
  const [loading, setLoading] = useState(true);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { data: featuredOffering, loading: featuredOfferingLoading } =
    useFetch<FeaturedOffering[]>("/featured");

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

  useEffect(() => {
    setLoading(featuredOfferingLoading);
  }, [featuredOfferingLoading]);

  return (
    <div className="relative w-full">
      {loading ? (
        <div className="w-full bg-gray-200 animate-pulse rounded-[15px] sm:h-[403px] h-[200px]"></div>
      ) : (
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full max-w-full relative"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <div className="w-full z-[2] absolute bottom-[30px] flex justify-center">
            <div className="flex flex-row gap-[8px]">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`${
                    current === index + 1
                      ? "bg-sheerpeace-purple-secondary w-8"
                      : "bg-gray-400 w-3"
                  } h-3 rounded-full duration-300`}
                ></button>
              ))}
            </div>
          </div>

          <CarouselContent>
            {featuredOffering?.map((featured, index) => (
              <CarouselItem key={index}>
                <div className="">
                  <Card className="overflow-hidden rounded-[15px]">
                    <CardContent className="flex aspect-square items-center justify-center p-0 sm:h-[403px] h-[200px] w-full overflow-hidden">
                      <Image
                        src={renderImageUrl(featured.image_url)}
                        alt={featured.title}
                        height={500}
                        width={500}
                        className="object-cover w-full h-full"
                        priority
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!loading ? (
            <>
              <CarouselPrevious className="absolute top-1/2 left-[30px] transform -translate-y-1/2" />
              <CarouselNext className="absolute top-1/2 right-[30px] transform -translate-y-1/2" />
            </>
          ) : null}
        </Carousel>
      )}
    </div>
  );
}
