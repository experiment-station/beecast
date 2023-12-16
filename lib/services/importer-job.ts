'use server';
import type { SelectedShow } from '@/components/select-shows';
import type { Tables } from '@/types/supabase/database';

import type { BulkEpisodes } from './episode';

import { DatabaseError } from '../errors';
import { fetchEpisodes } from './podcast-index/fetch-episodes';
import { searchShow } from './podcast-index/search-show';
import { createSupabaseServiceClient } from './supabase/service';

export const bulkShowSearch = async (selectedShows: SelectedShow[]) => {
  const spotifyIds = selectedShows.map((s) => s.id);
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from('imported_show')
    .select('*')
    .in('spotify_id', spotifyIds);

  if (error) {
    throw new DatabaseError(error);
  }

  const dataIds = data.map((d) => d.spotify_id);
  const filteredSelectedShows = selectedShows.filter(
    (s) => !dataIds.includes(s.id),
  );

  const podcastIndexShows = await Promise.all(
    filteredSelectedShows.map(async (show) => {
      const podcastIndexShow = await searchShow(show.name);
      return { ...podcastIndexShow, spotifyId: show.id };
    }),
  );
  return podcastIndexShows;
};

export const bulkEpisodeSearch = async (
  savedShows: Tables<'show'>[],
): Promise<BulkEpisodes[]> => {
  const fetchedEpisodes = await Promise.all(
    savedShows.map(async (show) => {
      const episodes = await fetchEpisodes(show.podcast_index_guid);
      return { episodes, showId: show.id };
    }),
  );

  return fetchedEpisodes;
};
