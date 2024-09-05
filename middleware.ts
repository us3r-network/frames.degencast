import { DEGENCAST_WEB_URL } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/proposal/frames")) {
    if (isBrowser(req)) {
      const castHash = req.nextUrl.searchParams.get("castHash") || "";
      return NextResponse.redirect(
        new URL(`${DEGENCAST_WEB_URL}/casts/${castHash.slice(2)}`)
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

function isBrowser(req: NextRequest): boolean {
  const userAgent = req.headers.get("user-agent");

  return (
    !!userAgent &&
    (userAgent.includes("Mozilla") ||
      userAgent.includes("Chrome") ||
      userAgent.includes("Safari"))
  );
}
