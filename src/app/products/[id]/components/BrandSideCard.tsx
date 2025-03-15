import Rating from "@/components/home/Rating";
import { Button } from "@/components/ui/button";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import Image from "next/image";
import React from "react";
import { Product } from "@/types";

interface BrandSideCardProps {
  product?: Product;
}

export default function BrandSideCard({ product }: BrandSideCardProps) {
  return (
    <div className="sticky top-[120px] bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Banner Image */}
      <div className="w-full h-[120px] relative">
        {product?.brand?.bannerImage && (
          <Image
            src={renderImageUrl(
              product?.brand?.bannerImage ?? "images/default.png"
            )}
            height={400}
            width={400}
            alt={product?.brand?.name || ""}
            className="h-full w-full object-cover"
          />
        )}
        {/* Overlay for Brand Logo */}
        <div className="absolute -bottom-8 left-6 h-[80px] w-[80px] rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
          {product?.brand?.logo && (
            <Image
              src={renderImageUrl(product?.brand?.logo ?? "images/default.png")}
              height={400}
              width={400}
              alt={product?.brand?.name || ""}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Brand Details */}
      <div className="p-6 pt-12 flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          {/* Brand Name and Rating */}
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {product?.brand?.name}
            </span>
            <Rating rating={product?.brand?.averageRating || 0} />
          </div>

          {/* Brand Description */}
          {product?.brand?.description && (
            <p className="text-gray-600 text-sm">
              {product?.brand?.description}
            </p>
          )}
        </div>

        <hr className=" border-gray-200" />

        {/* Contact Seller */}
        <div className="text-[14px]">
          <h2 className="text-[16px] font-semibold text-gray-800">
            Contact Seller
          </h2>
          <p className="text-gray-600">
            Have a question?{" "}
            <a
              href={`mailto:${product?.brand?.contactEmail}`}
              className="text-sheerpeace-primary hover:underline"
            >
              Send a message
            </a>
          </p>
        </div>

        {/* View More Products */}
        <div className="text-[14px]">
          <h2 className="text-[16px] font-semibold text-gray-800">
            More from this Brand
          </h2>
          <p className="text-gray-600">
            Explore other products by{" "}
            <span className="font-medium">{product?.brand?.name}</span>.
          </p>
          <Button className="w-full py-2 px-4 mt-2 bg-sheerpeace-purple-secondary text-white rounded-lg hover:bg-sheerpeace-primary-dark transition-colors">
            View All Products
          </Button>
        </div>
      </div>
    </div>
  );
}
