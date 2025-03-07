import React from "react";
import Rectangle from "../../../public/images/rectangle.svg";

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
    <div className="w-full rounded-[10px] sm:pr-[40px] flex flex-row justify-between overflow-hidden bg-sheerpeace-grey items-center">
      <div className="relative w-[220px] hidden sm:flex flex-row items-center gap-[10px]">
        <Rectangle className="absolute scale-150 sm:scale-100" />
        <div className="flex h-full w-full z-10  flex-row items-center gap-[10px] pl-[20px]">
          <Icon className="top-0 left-0 text-sheerpeace-purple-secondary" />
          <span className="text-white font-semibold text-[12px] sm:text-[15px]">
            {title}
          </span>
        </div>
      </div>

      <p className="sm:block hidden text-sheerpeace-black text-[13px]">
        {message}{" "}
        <span className="text-sheerpeace-purple-secondary">{code}</span>
      </p>
      <div className="sm:block hidden py-[10px]">
        <button className="bg-sheerpeace-purple-secondary text-white text-[10px] sm:text-[13px] rounded-[5px] px-[15px] py-[5px]">
          {cta}
        </button>
      </div>

      <div className="relative sm:hidden flex flex-row justify-between items-center z-[1] w-full py-[10px] px-[15px]">
        <div className="w-[60%]">
          <p className="text-sheerpeace-black text-[11px] sm:text-[13px]">
            {message}{" "}
            <span className="text-sheerpeace-purple-secondary">{code}</span>
          </p>
        </div>

        <button className="bg-sheerpeace-purple-secondary text-white text-[10px] sm:text-[13px] rounded-[5px] px-[15px] py-[5px]">
          {cta}
        </button>
      </div>
    </div>
  );
}
