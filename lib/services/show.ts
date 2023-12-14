import type { Tables } from '@/types/supabase/database';

import type { PodcastIndexShowType } from './podcast-index/search-show';

import { DatabaseError } from '../errors';
import { createSupabaseServiceClient } from './supabase/service';

export const saveShow = async (
  show: PodcastIndexShowType,
  spotifyId: Tables<'show'>['spotify_id'],
) => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from('show')
    .insert({
      description: show.description,
      images: [show.image],
      language: show.language,
      podcast_index_guid: show.podcastGuid,
      publisher: show.author,
      spotify_id: spotifyId,
      title: show.title,
      total_episode: show.episodeCount,
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  await saveShowToImported(data.id, spotifyId);

  return data;
};

const saveShowToImported = async (
  showId: Tables<'show'>['id'],
  spotifyId: Tables<'show'>['spotify_id'],
) => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase.from('imported_show').insert({
    show: showId,
    spotify_id: spotifyId,
  });

  if (error) {
    throw new DatabaseError(error);
  }

  return data;
};
