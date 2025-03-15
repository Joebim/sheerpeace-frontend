"use client";

import { useEffect } from "react";
import { useJwt } from "@/hooks/useJwt";
import useUserStore from "@/store/user.store";
import useNotificationStore from "@/store/notification.store";
import { useCartStore } from "@/store/cart.store";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const jwt = useJwt();
  const { initialize, isAuthenticated } = useUserStore();
  const { getNotifications } = useNotificationStore();
  const { getCart, synchronizeCart } = useCartStore();

  // Fetch user data only when jwt is available
  useEffect(() => {
    if (jwt) {
      initialize();
    }
  }, [jwt, initialize]);

  // Fetch general store data (brands, wishlist, notifications, cart)
  useEffect(() => {
    const fetchData = async () => {
      await Promise.allSettled([
        // getWishlist(),
        // fetchBrands(),
        getNotifications(),
        getCart(),
      ]);
    };
    fetchData();
  }, [getCart, getNotifications]);

  // Synchronize cart only after user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      synchronizeCart();
    }
  }, [isAuthenticated, synchronizeCart]);

  return <>{children}</>;
}
