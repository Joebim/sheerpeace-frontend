// app/api/auth/route.ts
import { getJwt } from "@/lib/cookie";
import { NextRequest, NextResponse } from "next/server";

// This route acts as a proxy to forward requests to the Express backend
export async function GET(req: NextRequest) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/me`; // Your Express backend URL

  // Get the JWT token from cookies
  const token = await getJwt();
  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  // Forward the request to the Express backend with the Authorization header
  const res = await fetch(url, {
    method: "GET",
    credentials: "include", // Include cookies with the request
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Send JWT in the Authorization header
    },
    next: { revalidate: 0 },
  });

  const data = await res.json();
  return NextResponse.json({ message: data.message });
}
