import { PODCAST_INDEX_BASE_URL, generateHeaders } from './utils';

type Show = {
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
  feeds: Show[];
};

export const searchShow = async (title: string): Promise<Show> => {
  const response = await fetch(
    `${PODCAST_INDEX_BASE_URL}/search/bytitle?q=${title}`,
    {
      headers: {
        Authorization: generateHeaders().Authorization,
        'User-Agent': 'Beecast',
        'X-Auth-Date': generateHeaders()['X-Auth-Date'],
        'X-Auth-Key': generateHeaders()['X-Auth-Key'],
      } as unknown as Record<string, string>,
      method: 'GET',
    },
  );

  const result = (await response.json()) as PodcastIndexResponse;
  const { feeds } = result;
  if (result.count > 1) {
    feeds.sort((a, b) => {
      return b.episodeCount - a.episodeCount;
    });
    return feeds[0];
  }

  return feeds[0];
};
