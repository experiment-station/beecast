import type { NextRequest } from 'next/server';

import { saveUserInfo } from '@/lib/services/spotify/save-user-info';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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
      await saveUserInfo({ session, user });
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
