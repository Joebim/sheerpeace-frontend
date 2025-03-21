"use client";

import useFetch from "@/hooks/useFetch";
import { PaginatedProducts, Product } from "@/types";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselApi } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AmountSold from "./AmountSold";
import Rating from "@/components/home/Rating";
import { usePrice } from "@/utils/usePrice";
import ProductListSection from "@/components/product/ProductListSection";
import ProductProperties from "@/components/product/ProductProperties";
import ProductSection from "@/components/home/sections/ProductSection";
import ViewProductSkeleton from "./ViewProductSkeleton";
import BrandSideCard from "./BrandSideCard";
import { useCartStore } from "@/store/cart.store";

interface ViewProductProps {
  productId: string;
}

export default function ViewProduct({ productId }: ViewProductProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = React.useState(0);
  const [productLoading, setProductLoading] = React.useState(true);

  const { data: products, loading } = useFetch<PaginatedProducts>(`/products`);

  const { addItem } = useCartStore();

  const { formatPrice } = usePrice();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const { data: product, loading: isLoading } = useFetch<Product>(
    productId ? `/products/${productId}` : ""
  );
  const pathname = usePathname();

  // Generate Breadcrumbs
  const generateBreadcrumbs = (crumbName: string) => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    let breadcrumbPath = "";

    return pathSegments.map((segment) => {
      breadcrumbPath += `/${segment}`;
      const name =
        segment === productId ? crumbName : segment.replace(/-/g, " ");
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        path: breadcrumbPath,
      };
    });
  };

  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...generateBreadcrumbs(product?.name || ""),
  ];

  const handleAddToCart = (product: Product) => {
    addItem({
      product_id: product.id,
      product: product,
      quantity: 1,
      selected_sizes: product?.sizes,
      selected_variants: product?.variants,
      selected_colors: product?.colors,
    });
  };

  useEffect(() => {
    setProductLoading(isLoading);
  }, [isLoading]);

  return (
    <div className="pt-[25px] sm:px-12 px-[20px]">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.path}>
                  {breadcrumb.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative flex flex-col sm:flex-row gap-8 mt-4 pb-[40px]">
        <div className="flex flex-col gap-[30px] flex-[8]">
          {productLoading ? (
            <ViewProductSkeleton />
          ) : (
            <>
              <div className="flex flex-[6] flex-col sm:flex-row gap-[20px]">
                <div className="flex-[3] flex flex-col gap-[20px]">
                  <Carousel
                    setApi={setApi}
                    className="relative w-full max-w-[560px]"
                  >
                    <CarouselContent>
                      {product?.images?.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card className="overflow-hidden">
                              <CardContent className="flex h-[300px] sm:h-[400px] items-center justify-center p-0">
                                {image && (
                                  <Image
                                    src={renderImageUrl(image)}
                                    width={500}
                                    height={500}
                                    alt={product?.name}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-[30px] transform -translate-y-1/2" />
                    <CarouselNext className="absolute top-1/2 right-[30px] transform -translate-y-1/2" />
                  </Carousel>

                  <div className="flex flex-row gap-[10px]">
                    {product?.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`relative h-[72px] w-[72px] duration-300  border-[3px] overflow-hidden cursor-pointer rounded-[8px] border-solid ${
                          index + 1 === current
                            ? "border-sheerpeace-purple-secondary"
                            : ""
                        }`}
                      >
                        {index + 1 !== current && (
                          <div className="absolute h-full w-full bg-[#ffffff8e]"></div>
                        )}
                        <Image
                          src={renderImageUrl(image)}
                          width={500}
                          height={500}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {product?.images?.length && product.images.length > 4 && (
                      <div
                        className="h-[72px] w-[72px] rounded-[8px] flex items-center justify-center bg-gray-200 cursor-pointer"
                        onClick={() => api?.scrollTo(4)}
                      >
                        <span>{product?.images?.length - 4} more+</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex-[3] flex flex-col gap-[20px] pt-[40px]">
                  <h1 className="text-2xl font-bold">{product?.name}</h1>
                  <p className="text-gray-600 text-[14px]">
                    {product?.description}
                  </p>

                  <div className="flex flex-row gap-[20px]">
                    <AmountSold sold={product?.number_sold ?? 0} />
                    <div className="flex flex-row items-center gap-[10px]">
                      <Rating rating={product?.average_rating ?? 0} />
                      {product?.total_reviews === 0 ? (
                        <span className="text-gray-500 text-[13px]">
                          (No reviews yet)
                        </span>
                      ) : (
                        <span className="text-gray-500 text-[13px]">
                          ({product?.average_rating} from{" "}
                          {product?.total_reviews} reviews)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price & Discount */}
                  <div className="flex items-center space-x-4">
                    <span className="text-[25px] font-bold">
                      {formatPrice(product?.price)}
                    </span>
                    <span className="text-[15px] font-semibold text-gray-300 line-through">
                      {formatPrice(product?.discounted_price)}
                    </span>
                    {product?.is_discounted && (
                      <Badge className="bg-sheerpeace-purple-secondary text-white">
                        {product?.discount_percentage}% OFF
                      </Badge>
                    )}
                  </div>

                  <Separator />

                  <div className="flex flex-row gap-[30px]">
                    {/* Product Attributes */}
                    <div>
                      <h3 className="text-[11px] font-semibold">
                        Available Colors
                      </h3>
                      <div className="flex space-x-1 mt-2">
                        {product?.colors?.map((color) => (
                          <div
                            key={color.id}
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[11px] font-semibold">
                        Available Sizes
                      </h3>
                      <div className="flex space-x-1 mt-2">
                        {product?.sizes?.map((size) => (
                          <div
                            key={size.id}
                            className="w-8 h-8 rounded-[3px] border flex justify-center items-center"
                          >
                            <span className="text-[13px] text-sheerpeace-black">
                              {size.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Add to Cart */}
                  {product && (
                    <Button
                      className="w-full h-[50px] rounded-full bg-sheerpeace-purple-secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}

          <ProductListSection
            products={products?.products || []}
            headerTitle="Related Items"
          />

          {product && <ProductProperties product={product} />}

          <ProductSection
            headerTitle="Featured Products"
            products={products?.products}
            loading={loading}
          />
          <ProductSection
            headerTitle="Featured Products"
            products={products?.products}
            loading={loading}
          />
        </div>

        <div className="flex-[3] relative w-full sm:w-[400px] h-auto">
          <BrandSideCard product={product} />
        </div>
      </div>
    </div>
  );
}
