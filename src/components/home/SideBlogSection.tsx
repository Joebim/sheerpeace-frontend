import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";

const blogData = [
  {
    id: "1",
    imageUrl: "/images/java-gui-example.jpg",
    title: "How to make GUI in Java with example",
    blogDate: "Sun 23, Feb 2024",
    authorName: "Dasteen",
    authorImage: "/images/dasteen-profile.jpg",
    postDate: "Jan 10, 2022",
    readingTime: "3 min",
  },
  {
    id: "2",
    imageUrl: "/images/react-performance.jpg",
    title: "Optimizing Performance in React Applications",
    blogDate: "Mon 10, Jan 2024",
    authorName: "Sarah Smith",
    authorImage: "/images/sarah-profile.jpg",
    postDate: "Jan 12, 2023",
    readingTime: "5 min",
  },
  {
    id: "3",
    imageUrl: "/images/nextjs-tutorial.jpg",
    title: "Getting Started with Next.js 14",
    blogDate: "Wed 15, Mar 2024",
    authorName: "John Doe",
    authorImage: "/images/john-profile.jpg",
    postDate: "Mar 16, 2024",
    readingTime: "7 min",
  },
  {
    id: "4",
    imageUrl: "/images/nextjs-tutorial.jpg",
    title: "Getting Started with Next.js 14",
    blogDate: "Wed 15, Mar 2024",
    authorName: "John Doe",
    authorImage: "/images/john-profile.jpg",
    postDate: "Mar 16, 2024",
    readingTime: "7 min",
  },
];

interface SideBlogSectionProps {
  headerTitle: string;
  loading: boolean;
}

const SideBlogSection: React.FC<SideBlogSectionProps> = ({
  headerTitle,
  loading,
}) => {
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    setProductLoading(loading);
  }, [loading]);

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="w-full border-b  pb-[8px]">
        <span className="text-[13px] font-bold">
          {headerTitle.toLocaleUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {productLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : blogData.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default SideBlogSection;
