import type { SignInWithOAuthCredentials } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';

import { HttpAuthenticationError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const getOAuthConfig = (
  provider: string,
): {
  provider: SignInWithOAuthCredentials['provider'];
  scopes?: string;
} => {
  switch (provider) {
    case 'spotify':
      return {
        provider,
        scopes: 'user-read-email user-read-playback-position user-library-read',
      };

    default:
      return {
        provider: 'github',
      };
  }
};

export async function POST(
  request: NextRequest,
  { params }: { params: { provider: string } },
) {
  const formData = await request.formData();
  const redirect = String(formData.get('redirect'));
  const redirectURL = new URL('/auth/callback', request.url);
  redirectURL.searchParams.set('redirect', redirect);

  const supabase = createSupabaseServerClient(cookies());
  const { provider, scopes } = getOAuthConfig(params.provider);
  const result = await supabase.auth.signInWithOAuth({
    options: {
      redirectTo: redirectURL.toString(),
      scopes,
    },
    provider,
  });

  if (result.error) {
    return new HttpAuthenticationError(result.error).toNextResponse();
  }

  return NextResponse.redirect(result.data.url, {
    status: 301,
  });
}
