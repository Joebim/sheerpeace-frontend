import { NextPage } from "next";
import FeaturedCarousel from "./FeaturedCarousel";
import { InfiniteCategoriesSlider } from "./sections/InfiniteCategoriesSlider";
import FeaturedCategory from "./sections/FeaturedCategory";
import ProductSection from "./sections/ProductSection";

const Homepage: NextPage = ({}) => {
  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <FeaturedCarousel/>
        <InfiniteCategoriesSlider/>
        <FeaturedCategory/>
        <ProductSection headerTitle="Featured Products" products={[]} />
      </div>
    </>
  );
};

export default Homepage;
