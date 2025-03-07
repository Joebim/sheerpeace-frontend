import React from "react";

export default function SideProductSkeleton() {
  return (
    <div className="h-[100px] flex flex-row gap-[10px] items-center animate-pulse">
      <div className="w-[100px] h-full bg-gray-300 rounded"></div>
      <div className="flex flex-col gap-[3px] flex-1">
        <div className="w-[50px] h-[10px] bg-gray-300 rounded"></div>
        <div className="flex flex-row gap-[10px] items-center">
          <div className="w-[30px] h-[10px] bg-gray-300 rounded"></div>
          <div className="w-[30px] h-[10px] bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-[10px] bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
