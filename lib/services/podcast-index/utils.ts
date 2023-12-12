import { env } from '@/env.mjs';
import crypto from 'node:crypto';

export const PODCAST_INDEX_BASE_URL = 'https://api.podcastindex.org/api/1.0';

type AuthTokenDateGenetrationType = {
  authDate: number;
  authorization: string;
};

export const generateAuthTokenAuthDate = (
  podcastIndexApiKey: string,
  podcastIndexSecret: string,
): AuthTokenDateGenetrationType => {
  const authDate = Math.floor(Date.now() / 1000);
  const authorization = crypto
    .createHash('sha1')
    .update(podcastIndexApiKey + podcastIndexSecret + authDate)
    .digest('hex');

  return { authDate, authorization };
};

export const generateHeaders = () => {
  const podcastIndexApiKey = env.NEXT_PUBLIC_PODCAST_INDEX_API_KEY;
  const podcastIndexSecret = env.NEXT_PUBLIC_PODCAST_INDEX_SECRET;

  const { authDate, authorization } = generateAuthTokenAuthDate(
    podcastIndexApiKey,
    podcastIndexSecret,
  );

  return {
    Authorization: authorization,
    'User-Agent': 'Beecast',
    'X-Auth-Date': authDate,
    'X-Auth-Key': podcastIndexApiKey,
  };
};