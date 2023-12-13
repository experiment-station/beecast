import type { NextRequest } from 'next/server';

import {
  BadRequestError,
  InternalServerError,
  ServerError,
} from '@/lib/errors';
import { saveUserInfo } from '@/lib/services/spotify/save-user-info';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (!code) {
    return new BadRequestError({
      message: 'No code provided',
    }).toNextResponse();
  }

  const supabase = createSupabaseServerClient(cookies());

  const {
    data: { session, user },
  } = await supabase.auth.exchangeCodeForSession(code);

  if (!session || !user) {
    return new BadRequestError({
      message: 'No session or user',
    }).toNextResponse();
  }

  try {
    await saveUserInfo({ session, user });
  } catch (error) {
    return error instanceof ServerError
      ? error.toNextResponse()
      : new InternalServerError({ error }).toNextResponse();
  }

  return NextResponse.redirect(requestUrl.origin);
}
