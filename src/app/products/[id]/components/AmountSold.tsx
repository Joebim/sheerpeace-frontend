import React from "react";

interface AmountSoldProps {
  sold: number;
}

export default function AmountSold({ sold }: AmountSoldProps) {
  const formatSold = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k+`;
    }
    return num.toString();
  };

  return sold !== 0 && <div>{formatSold(sold)} sold</div>;
}
