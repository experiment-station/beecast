'use server';

import type { Tables } from '@/types/supabase/database';

import { cookies } from 'next/headers';

import { DatabaseError } from '../errors';
import { getAccountId } from './account';
import { createSupabaseServerClient } from './supabase/server';

export const saveEpisodeContentSummary = async (
  id: Tables<'episode'>['id'],
  summary: string,
) => {
  const supabase = createSupabaseServerClient(cookies());

  const { error } = await supabase.from('episode_content').upsert(
    {
      account: await getAccountId(),
      episode: id,
      text_summary: summary,
    },
    {
      onConflict: 'episode',
    },
  );

  if (error) {
    throw new DatabaseError(error);
  }
};
