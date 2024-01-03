import type { NextRequest } from 'next/server';

import {
  DatabaseError,
  HttpBadRequestError,
  HttpInternalServerError,
} from '@/lib/errors';
import { updateAccount } from '@/lib/services/account';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    return new HttpBadRequestError({
      message: 'No code provided',
    }).toNextResponse();
  }

  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { session, user },
  } = await supabase.auth.exchangeCodeForSession(code);

  if (!session || !user) {
    return new HttpBadRequestError({
      message: 'No session or user',
    }).toNextResponse();
  }

  try {
    const { isNewAccount } = await updateAccount({ session, user });

    if (isNewAccount && process.env.SPOTIFY_STAGING === 'enabled') {
      return NextResponse.redirect(
        new URL('/onboarding/start', request.url).toString(),
        {
          status: 301,
        },
      );
    }

    const redirect = requestUrl.searchParams.get('redirect');
    const redirectURL = new URL(redirect || '/shows', request.url);
    return NextResponse.redirect(redirectURL);
  } catch (error) {
    switch (true) {
      case error instanceof DatabaseError:
        return new HttpInternalServerError(error).toNextResponse();

      case error instanceof ZodError:
        return new HttpBadRequestError(error).toNextResponse();

      default:
        return new HttpInternalServerError().toNextResponse();
    }
  }
}
