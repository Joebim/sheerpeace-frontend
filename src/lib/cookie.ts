"use server";

import { UserData } from "@/types";
// lib/cookie.ts
import { cookies } from "next/headers";

interface UserDetails {
  token: string;
  user: UserData;
}

// Function to get the JWT from cookies on the server side
export async function getUserCookie() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");
  return JSON.parse(user?.value || "{}");
}

export async function setUserCookie(user: UserDetails) {
  const cookieStore = await cookies();
  cookieStore.set("user", JSON.stringify(user), {
    path: "/",
    httpOnly: true,
    maxAge: 86400,
  }); // 1 day expiry
}

// Function to remove the JWT from cookies (for server-side use)
export async function removeUserCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("user");
}
