"use client";

import { useSearchParams } from "next/navigation";
import { useSubCategoryStore } from "@/store/subCategory.store";
import BannerSection from "@/components/home/BannerSection";
import { useCategoryStore } from "@/store/category.store";
import { Category, SubCategory } from "@/types";
import Image from "next/image";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import useHandleSearch from "@/hooks/useHandleSearch";

const renderUIByParam = (
  paramKey: string,
  searchParams: URLSearchParams,
  subcategories: SubCategory[],
  categories: Category[],
  handleSearch: (value: string, key: string) => void
) => {
  switch (paramKey) {
    case "keyword":
      return (
        <h1 className="text-2xl font-semibold">
          Search Results for &quot;{searchParams.get("keyword") || ""}&quot;
        </h1>
      );

    case "category": {
      const category = categories.find(
        (cat) => cat.name === searchParams.get("category")
      );
      return (
        <div className="flex flex-col gap-[20px]">
          {category && (
            <BannerSection
              image={category.image || "/uploads/images/default-banner.png"}
            />
          )}
          <div className="flex flex-col gap-[20px] items-center p-[15px] sm:p-[40px] rounded-[10px] bg-gray-50">
            {/* <h1 className="text-2xl font-semibold">More Categories</h1> */}

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {subcategories.map((subcategory: SubCategory) => (
                <div
                  key={subcategory.id}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => handleSearch(subcategory.name, "subcategory")}
                >
                  <Image
                    height={200}
                    width={200}
                    src={renderImageUrl(subcategory.image)}
                    alt={subcategory.name}
                    className="w-50 h-20 object-cover rounded-[5px]"
                  />
                  <h1 className="text-[12px]">{subcategory.name}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "subcategory": {
      const subCategory = subcategories.find(
        (sub) => sub.name === searchParams.get("subcategory")
      );

      return subCategory ? (
        <div className="">
          <BannerSection
            image={subCategory.image || "/uploads/images/default-banner.png"}
          />
        </div>
      ) : (
        <h1 className="text-2xl font-semibold">Subcategory Not Found</h1>
      );
    }

    case "brand":
      return (
        <h1 className="text-2xl font-semibold">
          Showing products from &quot;{searchParams.get("brand") || ""}&quot;
        </h1>
      );

    default:
      return null;
  }
};

const SearchHeader = () => {
  const searchParams = useSearchParams();
  const paramKeys = Array.from(searchParams.keys());
  const { subcategories } = useSubCategoryStore();
  const { categories } = useCategoryStore();
  const { handleSearch } = useHandleSearch();

  return (
    <>
      {paramKeys.length > 0 &&
        renderUIByParam(
          paramKeys[0],
          searchParams,
          subcategories,
          categories,
          handleSearch
        )}
    </>
  );
};

export default SearchHeader;
