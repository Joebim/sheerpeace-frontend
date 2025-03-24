"use client";

import { NextPage } from "next";
import FeaturedCarousel from "./FeaturedCarousel";
import ProductSection from "./sections/ProductSection";
import OffersSideCard from "./OffersSideCard";
import BenefitSection from "./BenefitSection";
import { Gift } from "lucide-react";
import CouponTab from "./CouponTab";
import DealSession from "./DealSession";
import BannerSection from "./BannerSection";
import SalesBanner from "./SalesBanner";
import SideProductSession from "./SideProductSession";
import SideBlogSection from "./SideBlogSection";
import ProductBanner from "./ProductBanner";
import { useProductStore } from "@/store/product.store";

const Homepage: NextPage = ({}) => {
  const { loading, trending, isNew, topSelling, topChoice, isFeatured } =
    useProductStore();

  return (
    <>
      <div className="flex flex-col gap-[20px] pt-[25px] sm:px-12 px-[20px]">
        <div className="flex flex-col sm:flex-row gap-[20px]">
          <div className="sm:flex-[55] sm:w-[55%] w-full">
            <FeaturedCarousel />
          </div>
          <div className="sm:flex-[30] sm:flex hidden flex-col gap-[20px] sm:w-[45%] w-full">
            <ProductBanner loading={loading} />
            <OffersSideCard loading={loading} />
          </div>
        </div>
        <div className="flex flex-row gap-[20px] w-full">
          <div className="sm:flex hidden flex-col gap-[40px] w-[20%] pb-[20px]">
            <BenefitSection />
            <SideProductSession
              title="Latest Products"
              products={isFeatured}
              loading={loading}
            />
            <SideBlogSection headerTitle="Latest Blogs" loading={loading} />
          </div>
          <div className="flex-grow flex flex-col gap-[20px] w-[80%] pb-[30px]">
            <CouponTab
              Icon={Gift}
              title="Special Gift"
              message="Get cool awesome deals for 50% off Code"
              cta="Get Coupon"
              code="192u893r3"
            />

            <DealSession
              dealTitle="Top Deals"
              products={topSelling}
              loading={loading}
            />

            <ProductSection
              headerTitle="Featured Products"
              products={isFeatured}
              loading={loading}
              snug="is_featured"
            />

            <ProductSection
              headerTitle="New Arrivals"
              products={isNew}
              loading={loading}
              snug="is_new"
            />

            <BannerSection image="/uploads/images/1740796144633-998540990.png" />

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
              headerTitle="Trending Products"
              products={trending}
              loading={loading}
              snug="trending"
            />
            <ProductSection
              headerTitle="Top Choice"
              products={topChoice}
              loading={loading}
              snug="top_choice"
            />

            <DealSession
              dealTitle="Limited Time Deals"
              products={topSelling}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
