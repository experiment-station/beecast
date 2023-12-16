'use server';
import { podcastIndexFetchClient } from './client';

export type PodcastIndexEpisodeType = {
  datePublished: number;
  datePublishedPretty: string;
  description: string;
  duration: number;
  enclosureUrl: string;
  episode: number;
  feedImage: string;
  feedLanguage: string;
  guid: string;
  image: string;
  language: string;
  size: number;
  title: string;
};

type PodcastIndexResponse = {
  count: number;
  items: PodcastIndexEpisodeType[];
  status: boolean;
};

export const fetchEpisodes = async (
  podcastGuid: string,
): Promise<PodcastIndexEpisodeType[]> => {
  const response = await podcastIndexFetchClient<PodcastIndexResponse>(
    `/episodes/bypodcastguid`,
    {
      params: {
        guid: podcastGuid,
        max: 50,
      },
    },
  );

  if (response.status) {
    return response.items;
  }

  return [];
};
