import type { Database } from '@/types/database';
import type { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

export const createSupabaseServerClient = (
  cookieStore: ReturnType<typeof cookies>,
) =>
  createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
