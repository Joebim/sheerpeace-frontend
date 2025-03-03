"use client";

import Homepage from "@/components/home/Homepage";
import { useJwt } from "@/hooks/useJwt";
import useNotificationStore from "@/store/notification.store";
import useUserStore from "@/store/user.store";
import { useEffect } from "react";

export default function Home() {
  const jwt = useJwt();
  const { initialize } = useUserStore();
  const { getNotifications } = useNotificationStore();

  useEffect(() => {
    if (jwt) {
      initialize();
    }
  }, [initialize, jwt]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  return (
    <>
      <Homepage />
    </>
  );
}
