// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/products(.*)',
  '/api/check-admin',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Protect non-public routes
    await auth.protect();
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Protect everything except static files, Next.js internals, and API routes
    "/((?!_next|api|static|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|mp4)).*)",
  ],
};
