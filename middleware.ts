import type { NextRequest } from 'next/server';

import {
  ENABLED_OAUTH_PROVIDERS,
  getSupabaseAuthSession,
} from '@/lib/services/supabase/auth';
import { NextResponse } from 'next/server';

const publicRoutes = [
  '/',
  '/auth/callback',
  '/sign-in',
  '/api/webhooks/stripe',
].concat(
  ENABLED_OAUTH_PROVIDERS.map((provider) => `/auth/sign-in/${provider}`),
);

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

  const nextURL = new URL(request.url);
  nextURL.pathname = '/sign-in';
  nextURL.searchParams.set('redirect', pathname);

  return NextResponse.redirect(nextURL);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.png|logo.svg|twitter-image.png|opengraph-image.png).*)',
  ],
};
