import { NextResponse } from 'next/server';

const CHAT_PATH = '/vx7q3';
const COOKIE_NAME = '__sc';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(CHAT_PATH)) {
    return NextResponse.next();
  }

  const headers = {
    'X-Robots-Tag': 'noindex, nofollow',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  };

  // PIN entry page — always accessible
  if (pathname === CHAT_PATH || pathname === CHAT_PATH + '/') {
    const response = NextResponse.next();
    Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
    return response;
  }

  // All other sub-routes require session cookie
  const session = request.cookies.get(COOKIE_NAME)?.value;

  if (!session) {
    return NextResponse.redirect(new URL(CHAT_PATH, request.url));
  }

  const response = NextResponse.next();
  Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
  return response;
}

export const config = {
  matcher: ['/vx7q3/:path*'],
};
