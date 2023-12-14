import type { Tables } from '@/types/supabase/database';

import { z } from 'zod';

import type { PodcastIndexEpisodeType } from './podcast-index/fetch-episodes';

import { DatabaseError } from '../errors';
import { createSupabaseServiceClient } from './supabase/service';

const serializedEpisodesSchema = z.array(
  z.object({
    audio_url: z.string().min(1),
    description: z.string().nullable(),
    duration: z.number().positive(),
    episode_number: z.number().nullable(),
    image: z.string(),
    podcast_index_guid: z.string().min(1),
    published_date: z.coerce.date(),
    published_date_pretty: z.string().min(1),
    show: z.number().positive(),
    title: z.string().min(1),
  }),
);

const mapEpisodes = (episodes: PodcastIndexEpisodeType[], showId: number) => {
  const serializedEpisodes = episodes.map((item) => {
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
  });

  const validation = serializedEpisodesSchema.safeParse(serializedEpisodes);

  if (!validation.success) {
    throw validation.error;
  }

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
