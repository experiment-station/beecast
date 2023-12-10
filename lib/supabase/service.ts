import type { Database } from '@/types/database';

import { createClient } from '@supabase/supabase-js';

export const createSupabaseServiceClient = () =>
  createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
