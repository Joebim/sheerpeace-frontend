import React, { useEffect, useState } from "react";
import { Category, SubCategory } from "@/types";
import Image from "next/image";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import useHandleSearch from "@/hooks/useHandleSearch";

interface categoryProps {
  subcategories: SubCategory[];
  categories: Category[];
  loading: boolean;
  subcategoryLoading: boolean;
}

const SkeletonLoader = () => (
  <div className="p-[5px] flex flex-col items-center gap-[5px] text-center">
    <div className="h-[50px] rounded-[5px] overflow-hidden w-full bg-gray-300 animate-pulse"></div>
    <span className="text-[10px] bg-gray-300 h-[10px] w-[50px] animate-pulse"></span>
  </div>
);

export default function CategorySelection({
  subcategories,
  subcategoryLoading,
  categories,
  loading,
}: categoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    Category[]
  >([]);

  const { handleSearch } = useHandleSearch();

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory && subcategories) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.category_id === selectedCategory.id
      );
      setFilteredSubcategories(filtered);
    }
  }, [selectedCategory, subcategories]);

  const handleCategoryHover = (category: Category) => {
    setSelectedCategory(category);
  };

  const isLoading = loading || subcategoryLoading;

  return (
    <>
      <div className="flex flex-row w-[123vh] h-full">
        <div className="flex-1 p-[20px] bg-sheerpeace-purple">
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : (
            <ul className="">
              {categories?.map((category) => (
                <li
                  key={category.id}
                  title={category.name}
                  className={`p-[5px] rounded-[3px] cursor-pointer ${
                    selectedCategory?.id === category.id
                      ? "bg-sheerpeace-purple-secondary text-white"
                      : "text-sheerpeace-purple-secondary hover:bg-white "
                  }`}
                  onMouseEnter={() => handleCategoryHover(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex-[5] p-[20px]">
          {isLoading ? (
            <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full">
              {filteredSubcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="p-[5px] flex flex-col items-center gap-[5px] text-center cursor-pointer"
                  onClick={() => handleSearch(subcategory.name, "subcategory")}
                >
                  <div className="h-[50px] rounded-[5px] overflow-hidden w-full">
                    <Image
                      height={800}
                      width={800}
                      src={renderImageUrl(subcategory.image)}
                      alt={subcategory.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-[10px]">{subcategory.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
