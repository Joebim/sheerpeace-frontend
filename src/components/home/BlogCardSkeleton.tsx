import React from "react";

const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white animate-pulse">
      {/* Skeleton Image */}
      <div className="overflow-hidden h-[150px] p-4">
        <div className="w-full h-full bg-gray-300 rounded-[10px]"></div>
      </div>

      {/* Skeleton Content */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

        {/* Skeleton Author & Meta */}
        <div className="flex items-center mt-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
