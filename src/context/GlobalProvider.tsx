"use client";

import { useEffect, useRef } from "react";
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
  const { getCart, synchronizeCart } = useCartStore();
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

  // ✅ Prevent double execution using useRef
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // Prevent re-execution
    hasFetched.current = true;

    const fetchData = async () => {
      if (jwt) {
        await initialize(); // Step 1: Initialize user first
      }

      // Step 2: Fetch products only after user initialization
      await Promise.allSettled([
        !isFeatured.length && fetchFeatured(),
        !isNew.length && fetchNew(),
        !topChoice.length && fetchTopChoice(),
        !topSelling.length && fetchTopSelling(),
        !trending.length && fetchTrending(),
        !products.length && fetchProducts(),
      ]);

      // Step 3: Synchronize and fetch cart after product data
      if (isAuthenticated) {
        await synchronizeCart();
        await getCart();
      }

      if (isAuthenticated) {
        await fetchWishlist();
      }

      // Step 4: Fetch other data (notifications, etc.)
      await getNotifications();
    };

    fetchData();
  }, [jwt, isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
}
