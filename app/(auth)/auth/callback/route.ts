import type { User } from '@supabase/supabase-js';
import type { NextRequest } from 'next/server';

import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type UserWithMetadata = {
  user_metadata: {
    avatar_url?: string;
    full_name?: string;
    provider_id?: string;
  };
} & User;

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  if (code) {
    const cookieStore = cookies();
    const supabase = createSupabaseServerClient(cookieStore);
    const {
      data: { session, user },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (session && user) {
      const typedUser: UserWithMetadata = user;
      const { error } = await supabase
        .from('account')
        .upsert(
          {
            avatar_url: typedUser.user_metadata.avatar_url,
            display_name: typedUser.user_metadata.full_name,
            provider_refresh_token: session.provider_refresh_token,
            provider_token: session.provider_token,
            spotify_id: typedUser.user_metadata.provider_id,
            user_id: typedUser.id,
          },
          { onConflict: 'spotify_id' },
        )
        .select();

      if (error) {
        return NextResponse.json(
          { message: 'Sign in flow failed' },
          {
            status: 500,
          },
        );
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
