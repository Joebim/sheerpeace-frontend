import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import Image from "next/image";
import React from "react";

interface BannerSectionProps {
  image: string;
}

export default function BannerSection({ image }: BannerSectionProps) {
  return (
    <div className="w-full h-[95px] sm:h-[200px] rounded-[10px] overflow-hidden">
      <Image
        height={1000}
        width={1000}
        src={renderImageUrl(
          image ?? "/uploads/images/1740797169927-648706414.png"
        )}
        className="object-cover h-full w-full"
        alt="Rectangle"
        priority
      />
    </div>
  );
}
