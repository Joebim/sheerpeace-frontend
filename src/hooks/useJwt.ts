import { useEffect, useState } from "react";
import { getUserCookie } from "@/lib/cookie";
import { UserData } from "@/types";

export const useJwt = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    getUserCookie().then((user) => setToken(user?.token || null));
  }, []);

  return token;
};

interface UserCookies {
  token: string;
  user: UserData;
}

export const useUser = () => {
  const [user, setUser] = useState<UserCookies>();

  useEffect(() => {
    getUserCookie().then((userData) => setUser(userData || null));
  }, []);

  return user;
};
