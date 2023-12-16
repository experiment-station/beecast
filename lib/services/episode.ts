'use server';
import type { Tables } from '@/types/supabase/database';

import { z } from 'zod';

import type { PodcastIndexEpisodeType } from './podcast-index/fetch-episodes';

import { DatabaseError } from '../errors';
import { createSupabaseServiceClient } from './supabase/service';

const episodeSchema = z.object({
  datePublished: z.coerce.date(),
  datePublishedPretty: z.string().min(1),
  description: z.string().nullable(),
  duration: z.number().positive(),
  enclosureUrl: z.string().min(1),
  episode: z.number().nullable(),
  feedImage: z.string().nullable(),
  guid: z.string().min(1),
  image: z.string().min(1),
  title: z.string().min(1),
});

const mapEpisodes = (episodes: PodcastIndexEpisodeType[], showId: number) => {
  const serializedEpisodes = episodes
    .map((item) => {
      const validation = episodeSchema.safeParse(item);
      if (!validation.success) {
        return null;
      }

      return {
        audio_url: item.enclosureUrl,
        description: item.description,
        duration: item.duration,
        episode_number: item.episode,
        image: item.feedImage || item.image,
        podcast_index_guid: item.guid,
        published_date: item.datePublished,
        published_date_pretty: item.datePublishedPretty,
        show: showId,
        title: item.title,
      };
    })
    .filter((i): i is Exclude<typeof i, null> => i !== null);

  return serializedEpisodes;
};

export const saveEpisodes = async (
  episodes: PodcastIndexEpisodeType[],
  showId: Tables<'show'>['id'],
) => {
  const serializedEpisodes = mapEpisodes(episodes, showId);

  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from('episode')
    .insert(serializedEpisodes)
    .select();

  if (error) {
    throw new DatabaseError(error);
  }

  return data;
};

export type BulkEpisodes = {
  episodes: PodcastIndexEpisodeType[];
  showId: number;
};

export const bulkSaveEpisodes = async (bulkEpisodes: BulkEpisodes[]) => {
  const savedEpisodes = await Promise.all(
    bulkEpisodes.map(async (item: BulkEpisodes) => {
      await saveEpisodes(item.episodes, item.showId);
    }),
  );
  return savedEpisodes;
};
