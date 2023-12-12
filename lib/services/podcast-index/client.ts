import { ofetch } from 'ofetch';

import { generateHeaders } from './utils';

export const PODCAST_INDEX_BASE_URL = 'https://api.podcastindex.org/api/1.0';

export const podcastIndexFetchClient = ofetch.create({
  baseURL: PODCAST_INDEX_BASE_URL,
  headers: {
    Authorization: generateHeaders().Authorization,
    'User-Agent': 'Beecast',
    'X-Auth-Date': generateHeaders()['X-Auth-Date'],
    'X-Auth-Key': generateHeaders()['X-Auth-Key'],
  } as unknown as Record<string, string>,
  method: 'GET',
});
