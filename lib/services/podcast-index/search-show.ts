import { podcastIndexFetchClient } from './client';

export type PodcastIndexShowType = {
  author: string;
  description: string;
  episodeCount: number;
  image: string;
  language: string;
  podcastGuid: string;
  title: string;
};

type PodcastIndexResponse = {
  count: number;
  feeds: PodcastIndexShowType[];
};

export const searchShow = async (
  title: string,
): Promise<PodcastIndexShowType> => {
  const response = await podcastIndexFetchClient<PodcastIndexResponse>(
    `/search/bytitle?q=${title}`,
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
