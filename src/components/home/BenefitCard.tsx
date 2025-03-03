import React from "react";

interface BenefitProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface BenefitCardProps {
  benefit: BenefitProps;
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  return (
    <div className="w-full p-[20px] bg-sheerpeace-grey rounded-[10px]">
      <div className="flex flex-col gap-[10px] items-start">
        <benefit.Icon className="w-[20px] h-[20px] text-sheerpeace-black" />
        <div className="flex flex-col gap-[5px]">
          <span className="text-[14px] font-bold">{benefit.title}</span>
          <span className="text-[12px]">{benefit.description}</span>
        </div>
      </div>
    </div>
  );
}
