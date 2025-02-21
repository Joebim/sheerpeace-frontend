/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NextPage } from "next";
import FeaturedCarousel from "./FeaturedCarousel";
import { InfiniteCategoriesSlider } from "./sections/InfiniteCategoriesSlider";
import FeaturedCategory from "./sections/FeaturedCategory";
import ProductSection from "./sections/ProductSection";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/types"; // Adjust the import path as necessary
const Homepage: NextPage = ({}) => {
  const {
    data: featuredProducts,
    error,
    loading: featuredProductsLoading,
  } = useFetch<Product[]>("/products");
  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <FeaturedCarousel />
        <InfiniteCategoriesSlider />
        <FeaturedCategory />
        <div className="flex flex-col gap-[50px]">
          <ProductSection
            headerTitle="Featured Products"
            products={featuredProducts}
            loading={featuredProductsLoading}
          />
          <ProductSection
            headerTitle="Featured Products"
            products={featuredProducts}
            loading={featuredProductsLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
