import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/login') && !pathname.startsWith('/api/login')) {
    const auth = req.cookies.get('admin_auth')?.value;
    if (auth !== 'true') {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
