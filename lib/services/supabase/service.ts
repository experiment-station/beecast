import type { Database } from '@/types/supabase/database';

import { env } from '@/env.mjs';
import { createClient } from '@supabase/supabase-js';

export const createSupabaseServiceClient = () =>
  createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
