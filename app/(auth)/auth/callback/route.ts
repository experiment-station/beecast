import type { NextRequest } from 'next/server';

import {
  DatabaseError,
  HttpBadRequestError,
  HttpInternalServerError,
} from '@/lib/errors';
import { saveUserInfo } from '@/lib/services/spotify/save-user-info';
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
    await saveUserInfo({ session, user });
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

  return NextResponse.redirect(requestUrl.origin);
}
