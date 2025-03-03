/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { NextPage } from "next";
import FeaturedCarousel from "./FeaturedCarousel";
import { InfiniteCategoriesSlider } from "./sections/InfiniteCategoriesSlider";
import FeaturedCategory from "./sections/FeaturedCategory";
import ProductSection from "./sections/ProductSection";
import useFetch from "@/hooks/useFetch";
import { Product } from "@/types"; // Adjust the import path as necessary
import { CategorySideCard } from "./CategorySideCard";
import OffersSideCard from "./OffersSideCard";
import BenefitSection from "./BenefitSection";
import AdvertTab from "./CouponTab";
import { Gift } from "lucide-react";
import CouponTab from "./CouponTab";
import DealSession from "./DealSession";
import BannerSection from "./BannerSection";
import SalesBanner from "./SalesBanner";
import SideProductSession from "./SideProductSession";
const Homepage: NextPage = ({}) => {
  const {
    data: featuredProducts,
    error,
    loading: featuredProductsLoading,
  } = useFetch<Product[]>("/products");
  return (
    <>
      <div className="flex flex-col gap-[20px] pt-[40px] px-12">
        <div className="flex flex-row gap-[20px] w-full">
          <div className="flex flex-col gap-[20px]">
            <CategorySideCard />
            <BenefitSection />
            <SideProductSession title="Latest Products" products={featuredProducts}/>
          </div>
          <div className="flex-grow flex flex-col gap-[20px]">
            <div className="flex flex-row gap-[20px]">
              {" "}
              <div className="flex-[3]">
                <FeaturedCarousel />
              </div>
              <div className="flex-[1.5]">
                <OffersSideCard />
              </div>
            </div>

            <CouponTab
              Icon={Gift}
              title="Special Gift"
              message="Get cool awesome deals for 50% off Code"
              cta="Get Coupon"
              code="192u893r3"
            />

            <DealSession dealTitle="Daily Deals" products={featuredProducts} />

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
            <BannerSection />

            <SalesBanner
              offerText="SALE UP TO"
              percentageOff="35%"
              title="HUNDREDS of New Lower Prices!"
              description="It’s more affordable than ever to give every room in your home a stylish makeover."
              cta="Shop Now"
              link="/shop"
              imageUrl="/uploads/images/1740798076784-672867564.jpg"
            />
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
      </div>
    </>
  );
};

export default Homepage;
