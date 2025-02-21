import { useEffect, useState } from "react";
import { getJwt } from "@/lib/cookie";

export const useJwt = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getJwt().then((jwt) => setToken(jwt || null));
  }, []);

  return token;
};
