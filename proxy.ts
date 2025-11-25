import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { getBaseUrl } from "@/lib/getBaseUrl";

const isPublicRoute = createRouteMatcher([
  "/landing(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/api",
  "/(public|_next)(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) return;

  // Redirect unauthed → /landing
  await auth.protect({
    unauthenticatedUrl: `${getBaseUrl()}/landing`,
  });
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|svg|woff2?|ico|csv|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
