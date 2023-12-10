import type { NextRequest } from 'next/server';

import { getSupabaseAuthSession } from '@/lib/supabase/auth';
import { NextResponse } from 'next/server';

const publicRoutes = ['/'];

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
