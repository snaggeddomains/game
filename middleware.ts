import { NextRequest, NextResponse } from 'next/server';

const LOGIN_PATH = '/game/admin/login';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/game/admin') && pathname !== LOGIN_PATH) {
    const token = req.cookies.get('admin_auth')?.value;
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected || token !== expected) {
      // Redirect to the browser-facing /admin/login (goes through Vercel rewrite)
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/game/admin/:path*'],
};
