import { NextResponse } from "next/server";



// Define public routes
const publicPaths = [
  '/login',
  '/forgot-password',
  '/otp-verification',
  '/set-new-password',
]


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function middleware(req:any) {
 const { pathname } = req.nextUrl


  // Allow requests to static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // If the route is public, allow
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

    // Get the accessToken value
  const isLoggedIn = req.cookies.get("expire-deals-token")?.value;  

  if (!isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  } 

   return NextResponse.next()
}

export const config = {
  matcher: [ 
    "/admin/:path*",
    "/messages",
    "/notification",
    "/checkout",
    "/login",
    "/sign-up",

     '/((?!_next|static|favicon.ico|api|login|forgot-password|otp-verification|set-new-password).*)',
  ],
};
