import { NextResponse } from "next/server"

export const config = {
  matcher: ['/about', '/test']
}

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    // if is logined
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (request.nextUrl.pathname.startsWith('/test')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}