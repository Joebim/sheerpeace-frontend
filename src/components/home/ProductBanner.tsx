import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import Image from "next/image";
import React from "react";

interface ProductBannerProps {
  loading?: boolean;
}

export default function ProductBanner({ loading }: ProductBannerProps) {
  return (
    <>
      {loading ? (
        <div className="rounded-[15px] bg-gray-300 animate-pulse h-[250px] flex-1"></div>
      ) : (
        <div className="rounded-[15px] bg-gray-300 marker:h-[250px] overflow-hidden flex-1">
          <Image
            src={renderImageUrl("/uploads/images/1741133552139-655480721.png")}
            height={800}
            width={800}
            alt="product banner"
            className="object-cover h-full w-full"
            priority
          />
        </div>
      )}
    </>
  );
}
