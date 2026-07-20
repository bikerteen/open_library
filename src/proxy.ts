import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isMutatingApi =
    (pathname.startsWith("/api/tools") || pathname.startsWith("/api/tags")) &&
    method !== "GET";

  if (!isAdminPage && !isMutatingApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthed = token ? await verifySessionToken(token) : false;

  if (isAuthed) {
    return NextResponse.next();
  }

  if (isMutatingApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/tools/:path*", "/api/tags/:path*"],
};
