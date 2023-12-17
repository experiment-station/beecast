'use server';
import type { Tables } from '@/types/supabase/database';

import { z } from 'zod';

import type { PodcastIndexShowType } from './podcast-index/search-show';

import { DatabaseError } from '../errors';
import { fetchAccount } from './account';
import { createSupabaseServiceClient } from './supabase/service';

const showSchema = z.object({
  author: z.string().min(1),
  description: z.string().nullable(),
  episodeCount: z.number().positive(),
  image: z.string().min(1),
  language: z.string().min(1),
  podcastGuid: z.string().min(1),
  spotifyId: z.string().min(1),
  title: z.string().min(1),
});

const mapShows = (shows: PodcastIndexShowType[]) => {
  const serializedShows = shows
    .map((show) => {
      const validation = showSchema.safeParse(show);
      if (!validation.success) {
        return null;
      }

      return {
        description: show.description,
        images: [show.image],
        language: show.language,
        podcast_index_guid: show.podcastGuid,
        publisher: show.author,
        spotify_id: show.spotifyId,
        title: show.title,
        total_episode: show.episodeCount,
      };
    })
    .filter((i): i is Exclude<typeof i, null> => i !== null);

  return serializedShows;
};

export const saveShow = async (show: PodcastIndexShowType) => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from('show')
    .insert({
      description: show.description,
      images: [show.image],
      language: show.language,
      podcast_index_guid: show.podcastGuid,
      publisher: show.author,
      spotify_id: show.spotifyId,
      title: show.title,
      total_episode: show.episodeCount,
    })
    .select()
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  await saveShowToImported(data.id, show.spotifyId, show.podcastGuid);

  return data;
};

export const bulkSaveShow = async (shows: PodcastIndexShowType[]) => {
  const serializedShows = mapShows(shows);
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from('show')
    .insert(serializedShows)
    .select();

  if (error) {
    throw new DatabaseError(error);
  }

  data.map(async (item) => {
    await saveShowToImported(item.id, item.spotify_id, item.podcast_index_guid);
  });

  return data;
};

const saveShowToImported = async (
  showId: Tables<'show'>['id'],
  spotifyId: Tables<'show'>['spotify_id'],
  podcastIndexGuid: string,
) => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase.from('imported_show').insert({
    podcast_index_guid: podcastIndexGuid,
    show: showId,
    spotify_id: spotifyId || '',
  });

  if (error) {
    throw new DatabaseError(error);
  }

  return data;
};

export const getShowWithGuid = async (
  guid: Tables<'show'>['podcast_index_guid'],
) => {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from('show')
    .select('*')
    .eq('podcast_index_guid', guid)
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  return data;
};

export const followShow = async (
  shows:
    | Tables<'show'>['podcast_index_guid']
    | Tables<'show'>['podcast_index_guid'][],
) => {
  const supabase = createSupabaseServiceClient();
  const account = await fetchAccount();
  const showsAsArray = shows instanceof Array ? shows : [shows];

  const insertShows = await Promise.all(
    showsAsArray.map(async (s) => {
      const { data, error } = await supabase
        .from('show')
        .select('id')
        .eq('podcast_index_guid', s)
        .single();
      if (error) {
        throw new DatabaseError(error);
      }

      return {
        account: account.id,
        show: data.id,
      };
    }),
  );

  if (insertShows.length > 0) {
    const { data, error } = await supabase
      .from('account_show_relation')
      .insert(insertShows)
      .select();

    if (error) {
      throw new DatabaseError(error);
    }

    return data;
  }
  return [];
};
