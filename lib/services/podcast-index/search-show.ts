'use server';
import type { Tables } from '@/types/supabase/database';

import { podcastIndexFetchClient } from './client';

export type PodcastIndexShowType = {
  author: string;
  description: string;
  episodeCount: number;
  image: string;
  language: string;
  podcastGuid: string;
  spotifyId: Tables<'show'>['spotify_id'];
  title: string;
};

type PodcastIndexResponse = {
  count: number;
  feeds: PodcastIndexShowType[];
};

export const searchShow = async (
  title: string,
): Promise<PodcastIndexShowType | undefined> => {
  const response = await podcastIndexFetchClient<PodcastIndexResponse>(
    `/search/bytitle`,
    {
      params: {
        q: title,
      },
    },
  );

  const { feeds } = response;
  if (response.count > 1) {
    feeds.sort((a, b) => {
      return b.episodeCount - a.episodeCount;
    });
    return feeds[0];
  }

  return feeds[0];
};
