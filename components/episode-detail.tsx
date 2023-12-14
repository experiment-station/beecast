import type { Tables } from '@/types/supabase/database';

import { DatabaseError } from '@/lib/errors';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { cookies } from 'next/headers';

type Props = {
  id: Tables<'episode'>['id'];
};

export async function EpisodeDetail(props: Props) {
  const supabase = createSupabaseServerClient(cookies());
  const { data, error } = await supabase
    .from('episode')
    .select('*')
    .eq('id', props.id)
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  return <div>{data.title}</div>;
}
