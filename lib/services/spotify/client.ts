import { ofetch } from 'ofetch';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export const spotifyFetchClient = ofetch.create({
  baseURL: SPOTIFY_BASE_URL,
  params: { limit: 50, offset: 0 },
});
