import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// See https://clerk.com/docs/references/nextjs/clerk-middleware for handling protected routes


export default clerkMiddleware((auth, request) => {

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};