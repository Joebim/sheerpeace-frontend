import Image from "next/image";
import React from "react";

interface CouponTabProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  message: string;
  cta: string;
  code: string;
}

export default function CouponTab({
  Icon,
  title,
  message,
  cta,
  code,
}: CouponTabProps) {
  return (
    <div className="w-full rounded-[10px] pr-[40px] flex flex-row justify-between overflow-hidden bg-sheerpeace-grey items-center">
      <div className="relative w-[220px] flex flex-row items-center gap-[10px]">
        <Image
          height={300}
          width={300}
          src="/images/rectangle.svg"
          className="absolute"
          alt="Rectangle"
        />
        <div className="h-full w-full z-10 flex flex-row items-center gap-[10px] pl-[20px]">
          <Icon className="top-0 left-0 text-sheerpeace-purple-secondary" />
          <span className="text-white font-semibold">{title}</span>
        </div>
      </div>

      <p className="text-sheerpeace-black text-[13px]">
        {message}{" "}
        <span className="text-sheerpeace-purple-secondary">{code}</span>
      </p>
      <div className="py-[10px]">
        <button className="bg-sheerpeace-purple-secondary text-white text-[13px] rounded-[5px] px-[15px] py-[5px]">
          {cta}
        </button>
      </div>
    </div>
  );
}
