import type { Database } from '@/types/supabase/database';
import type { CookieOptions } from '@supabase/ssr';
import type { NextRequest } from 'next/server';

import { env } from '@/env.mjs';
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export const getSupabaseAuthSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        remove(name, options) {
          request.cookies.delete({
            name,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.delete({
            name,
            ...options,
          });
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
      },
    },
  );

  const authSession = await supabase.auth.getSession();

  return { authSession, response };
};
