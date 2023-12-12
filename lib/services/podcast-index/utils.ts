import { generateAuthTokenAuthDate } from '@/packages/podcast-index';

export const PODCAST_INDEX_BASE_URL = 'https://api.podcastindex.org/api/1.0';

export const generateHeaders = () => {
  const podcastIndexApiKey = process.env.NEXT_PUBLIC_PODCAST_INDEX_API_KEY!;
  const podcastIndexSecret = process.env.NEXT_PUBLIC_PODCAST_INDEX_SECRET!;

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
