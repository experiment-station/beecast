import { spotifyFetchClient } from './client';

type Image = {
  height: number;
  url: string;
  width: number;
};

type Show = {
  description: string;
  id: string;
  images: Image[];
  language: string;
  name: string;
  publisher: string;
  total_episodes: number;
};

export type SpotifyShow = {
  added_at: string;
  show: Show;
};

type SpotifyItems = {
  items: SpotifyShow[];
  limit: number;
  offset: number;
};

export const getUserShows = async (
  spotifyToken: string,
): Promise<SpotifyShow[]> => {
  const response = await spotifyFetchClient<SpotifyItems>('/me/shows', {
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
    },
  });

  return response.items;
};
