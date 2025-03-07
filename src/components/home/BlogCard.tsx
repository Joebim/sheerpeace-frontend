import Image from "next/image";
import React from "react";
import { Blog } from "@/types";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Blog Image */}
      <div className="overflow-hidden h-[150px] p-4">
        <Image
          height={800}
          width={800}
          className="w-full h-full object-cover rounded-[10px] "
          src={blog.imageUrl}
          alt={blog.title}
        />
      </div>

      {/* Blog Content */}
      <div className="p-4">
        <p className="text-sheerpeace-purple-secondary text-[10px] font-semibold">
          {blog.blogDate}
        </p>
        <h2 className="text-[14px] font-bold mt-1">{blog.title}</h2>

        {/* Author & Meta */}
        <div className="flex items-center mt-4 text-gray-500">
          <Image
            height={800}
            width={800}
            src={blog.authorImage}
            alt={blog.authorName}
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="">
            <span className="font-medium text-[12px]">{blog.authorName}</span>
            <div className="text-[10px]">
              <span>{blog.postDate}</span>
              <span className="mx-2">∙</span>
              <span>{blog.readingTime} read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  
  );
};

export default BlogCard;
