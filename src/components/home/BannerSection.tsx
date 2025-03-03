import useFetch from "@/hooks/useFetch";
import { renderImageUrl } from "@/hooks/useRenderImageUrl";
import { Upload } from "@/types";
import Image from "next/image";
import React from "react";

export default function BannerSection() {
  const uploadId = "d7c566f0-4f2b-4bef-9e4d-0122da1bb26d";

  const {
    data: bannerImage,
    // error,
    loading,
  } = useFetch<Upload>(`/uploads/${uploadId}`);
  return (
    <div className="w-full h-[200px] rounded-[10px] overflow-hidden">
      {loading ? (
        <div className="h-full w-full animate-pulse bg-gray-300"></div>
      ) : (
        <Image
          height={1000}
          width={1000}
          src={renderImageUrl(
            bannerImage?.file ?? "/uploads/images/1740797169927-648706414.png"
          )}
          className="object-cover h-full w-full"
          alt="Rectangle"
        />
      )}
    </div>
  );
}
