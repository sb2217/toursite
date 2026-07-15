import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect admin routes (except login API and login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (!sessionCookie) {
      // Redirect to login page if cookie is missing
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    try {
      // Decode JWT payload to check expiration (standard base64 parsing)
      const payloadPart = sessionCookie.split(".")[1];
      if (!payloadPart) throw new Error("Invalid JWT token format");

      const decodedPayload = JSON.parse(
        atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"))
      );

      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedPayload.exp && decodedPayload.exp < currentTime) {
        // Redirect to login if token has expired
        const url = request.nextUrl.clone();
        url.pathname = "/admin/login";
        const response = NextResponse.redirect(url);
        response.cookies.delete("admin_session");
        return response;
      }
    } catch (error) {
      // Redirect to login if token is corrupt
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      const response = NextResponse.redirect(url);
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ["/admin/:path*"],
};
