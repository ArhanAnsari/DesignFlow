import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  // Define public routes
  const publicRoutes = ["/sign-in", "/sign-up", "/landing"];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If user is authenticated and tries to access auth pages, redirect to home
  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and tries to access protected pages
  if (!session && !isPublicRoute) {
    // Allow access to static files and api routes
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/static") ||
      pathname.includes(".") // Files like favicon.ico, etc.
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
