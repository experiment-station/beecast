import type { Tables } from '@/types/supabase/database';

import type { PodcastIndexShowType } from './podcast-index/search-show';

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
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
