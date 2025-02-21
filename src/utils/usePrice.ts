import { useCallback } from 'react';

export const usePrice = () => {
  const formatPrice = useCallback((amount: number | undefined) => {
    const USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    return USDollar.format(amount ?? 0);
  }, []);

  return { formatPrice };
};
