import { FetchError } from 'ofetch';

import { fetchAccount } from '../account';
import { refreshToken, spotifyFetchClient } from './client';

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
): Promise<[] | SpotifyShow[]> => {
  try {
    const response = await spotifyFetchClient<SpotifyItems>('/me/shows', {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
      retry: 2,
      retryDelay: 1000,
    });
    return response.items;
  } catch (error) {
    if (error instanceof FetchError) {
      if (error.status === 401) {
        const account = await fetchAccount();
        if (account.provider_refresh_token) {
          await refreshToken(account.provider_refresh_token);
          return [];
        }
        throw new Error('Authorization error');
      }
    }
    throw new Error('Spotify server error');
  }
};
