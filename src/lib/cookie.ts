"use server"

// lib/cookie.ts
import { cookies } from "next/headers";

// Function to get the JWT from cookies on the server side
export async function getJwt() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");
  return token?.value;
}

// Function to set the JWT in cookies (for server-side use)
export async function setJwt(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("jwt", token, { path: "/", httpOnly: true, maxAge: 86400 }); // 1 day expiry
}

// Function to remove the JWT from cookies (for server-side use)
export async function removeJwt() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
}


