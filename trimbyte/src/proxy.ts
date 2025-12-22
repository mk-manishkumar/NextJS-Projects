import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname, searchParams } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) return NextResponse.next();

  if (searchParams.has("callbackUrl")) return NextResponse.next();

  if (pathname.startsWith("/profile") || pathname.startsWith("/saved-links") || pathname.startsWith("/previous-links")) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/saved-links/:path*", "/previous-links/:path*"],
};
