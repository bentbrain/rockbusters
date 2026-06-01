import { rockbustersDistinctIdCookie } from "@/lib/feature-flags";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const existingDistinctId = request.cookies.get(rockbustersDistinctIdCookie);

  if (existingDistinctId === undefined) {
    response.cookies.set(rockbustersDistinctIdCookie, crypto.randomUUID(), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
  }

  return response;
}

export const config = {
  matcher: "/",
};
