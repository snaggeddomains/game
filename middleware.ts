import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PREFIX = '/game/admin';
const LOGIN_PATH = '/game/admin/login';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(ADMIN_PREFIX) && pathname !== LOGIN_PATH) {
    const token = req.cookies.get('admin_auth')?.value;
    const expected = process.env.ADMIN_PASSWORD;

    if (!expected || token !== expected) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = LOGIN_PATH;
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/game/admin/:path*'],
};
