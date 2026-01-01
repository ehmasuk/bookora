import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const session = await auth();

  const path = request.nextUrl.pathname;

  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (path === "/register" && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (path === "/profile" && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (path === "/book/:path*" && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/book/:path*", "/profile"],
};
