import { DEGENCAST_WEB_URL } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isBrowser(req)) {
    if (
      pathname === "/curationchannel/frames/channels" ||
      pathname === "/waitlist-v1/frames"
    ) {
      return NextResponse.redirect(new URL(`${DEGENCAST_WEB_URL}`));
    }
    if (
      pathname.startsWith("/proposal/frames") ||
      pathname.startsWith("/curationnft/frames")
    ) {
      const castHash = req.nextUrl.searchParams.get("castHash") || "";
      return NextResponse.redirect(
        new URL(`${DEGENCAST_WEB_URL}/casts/${castHash}`)
      );
    }
    if (pathname.startsWith("/createproposal/frames")) {
      const castHash = req.nextUrl.pathname.split("/").pop();
      return NextResponse.redirect(
        new URL(`${DEGENCAST_WEB_URL}/casts/${castHash}`)
      );
    }
    if (pathname.startsWith("/curationchannel/frames")) {
      const channel = req.nextUrl.searchParams.get("channelId") || "home";
      return NextResponse.redirect(
        new URL(`${DEGENCAST_WEB_URL}/communities/${channel}`)
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
