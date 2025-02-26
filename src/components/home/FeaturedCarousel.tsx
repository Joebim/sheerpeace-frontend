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
import useFetch from "@/hooks/useFetch";
import { FeaturedOffering } from "@/types";
import Image from "next/image";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";

export default function FeaturedCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const {
    data: featuredOffering,
    loading,
    error,
  } = useFetch<FeaturedOffering[]>("/featured");

  return (
    <div className="flex flex-row justify-center">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-[85%]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredOffering?.map((featured, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-0 h-[500px] w-full rounded-[20px] overflow-hidden">
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

        <CarouselPrevious className="" />
        <CarouselNext className="mr-[-20px]" />
      </Carousel>
    </div>
  );
}
