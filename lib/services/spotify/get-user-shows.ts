import { spotifyFetchClient } from './client';

type Show = {
  description: string;
  id: string;
  images: string;
  language: string;
  name: string;
  publisher: string;
  total_episodes: number;
};

type Items = {
  added_at: string;
  show: Show;
};

type SpotifyItems = {
  items: Items[];
  limit: number;
  offset: number;
};

export const getUserShows = async (spotifyToken: string): Promise<Items[]> => {
  const response = await spotifyFetchClient<SpotifyItems>('/me/shows', {
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
    },
  });

  return response.items;
};
