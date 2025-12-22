import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only protect admin pages — nothing else
  const isAdminRoute = pathname.startsWith("/Admin");

  // Retrieve token from cookies
  const token = request.cookies.get("token")?.value;

  // No token → redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If there IS a token → check the role
  if (isAdminRoute && token) {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );

      if (payload.role !== "Admin") {
        return NextResponse.redirect(new URL("/Home", request.url));
      }

    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Admin/:path*"], // protect only admin routes
};
