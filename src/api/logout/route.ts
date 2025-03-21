// app/api/logout/route.ts
import { removeUserCookie } from "@/lib/cookie";
import { NextResponse } from "next/server";

// Handle logout request and remove JWT token from cookies
export async function POST() {
  try {
    await removeUserCookie(); // Remove the JWT cookie
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: `Logout failed ${error}` },
      { status: 500 }
    );
  }
}
