"use client";

import { useEffect } from "react";
import { useJwt } from "@/hooks/useJwt";
import useUserStore from "@/store/user.store";
import useNotificationStore from "@/store/notification.store";
import { useCartStore } from "@/store/cart.store";
import { useProductStore } from "@/store/product.store";
import useWishlistStore from "@/store/wishlist.store";

export default function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const jwt = useJwt();
  const { initialize, isAuthenticated } = useUserStore();
  const { getNotifications } = useNotificationStore();
  const { getCartAndSync } = useCartStore();
  const { fetchWishlist } = useWishlistStore();
  const {
    fetchFeatured,
    fetchNew,
    fetchProducts,
    fetchTopChoice,
    fetchTopSelling,
    fetchTrending,
    trending,
    isNew,
    topSelling,
    topChoice,
    isFeatured,
    products,
  } = useProductStore();

  useEffect(() => {
    const fetchData = async () => {
      if (jwt) {
        await initialize(); // Step 1: Initialize user
      }

      // Step 2: Fetch product data
      await Promise.allSettled([
        !isFeatured.length && fetchFeatured(),
        !isNew.length && fetchNew(),
        !topChoice.length && fetchTopChoice(),
        !topSelling.length && fetchTopSelling(),
        !trending.length && fetchTrending(),
        !products.length && fetchProducts(),
      ]);

      // Step 3: Fetch wishlist and notifications
      if (isAuthenticated) {
        await fetchWishlist();
        await getNotifications();
      }

      // Step 4: Handle cart fetch separately
      if (isAuthenticated) {
        await getCartAndSync();
      }
    };

    fetchData();
  }, [jwt, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
