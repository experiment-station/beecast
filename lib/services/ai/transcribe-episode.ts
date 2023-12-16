'use server';

import type { Tables } from '@/types/supabase/database';

import { DatabaseError } from '@/lib/errors';
import { getFinalRedirectURL } from '@/lib/utils/get-final-redirect-url';
import { cookies } from 'next/headers';

import { getAccountId } from '../account';
import { createSupabaseServerClient } from '../supabase/server';
import { transcribeAudio } from './deepgram';

export const transcribeEpisode = async (id: Tables<'episode'>['id']) => {
  const supabase = createSupabaseServerClient(cookies());

  const existingEpisodeContentQuery = await supabase
    .from('episode_content')
    .select('transcription')
    .eq('episode', id);

  if (existingEpisodeContentQuery.error) {
    throw new DatabaseError(existingEpisodeContentQuery.error);
  }

  if (existingEpisodeContentQuery.data[0]?.transcription) {
    return existingEpisodeContentQuery.data[0].transcription;
  }

  const episodeQuery = await supabase
    .from('episode')
    .select('audio_url')
    .eq('id', id)
    .single();

  if (episodeQuery.error) {
    throw new DatabaseError(episodeQuery.error);
  }

  const fileURL = await getFinalRedirectURL(episodeQuery.data.audio_url);
  const transcription = await transcribeAudio({ fileURL });

  const updateEpisodeContentQuery = await supabase
    .from('episode_content')
    .upsert(
      {
        account: await getAccountId(),
        episode: id,
        transcription,
      },
      {
        onConflict: 'episode',
      },
    )
    .select('transcription')
    .single();

  if (updateEpisodeContentQuery.error) {
    throw new DatabaseError(updateEpisodeContentQuery.error);
  }

  return transcription;
};
