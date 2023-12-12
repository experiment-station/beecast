import type { PodcastIndexShowType } from './podcast-index/search-show';

import { createSupabaseBrowserClient } from './supabase/browser';

export const saveShow = async (
  show: PodcastIndexShowType,
  spotifyId: string,
) => {
  const supabase = createSupabaseBrowserClient();
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
