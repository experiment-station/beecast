import type { NextRequest } from 'next/server';

import { getSupabaseAuthSession } from '@/lib/services/supabase/auth';
import { NextResponse } from 'next/server';

const publicRoutes = [
  '/',
  '/auth/callback',
  '/auth/sign-in',
  '/sign-in',
  '/api/webhooks/stripe',
];

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }

  const { authSession, response } = await getSupabaseAuthSession(request);
  if (authSession.data.session) {
    return response;
  }

  return NextResponse.redirect(new URL('/sign-in', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.png|logo.svg).*)'],
};
