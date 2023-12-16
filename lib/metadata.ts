import type { Metadata } from 'next';

export const SITE_NAME = 'beecast.ai';
export const SITE_DESCRIPTION = 'Your hard-working AI podcast companion';
export const SITE_TITLE = 'beecast';

export const getDefaultMetadata = (): Metadata => ({
  description: SITE_DESCRIPTION,
  openGraph: {
    description: SITE_DESCRIPTION,
    title: SITE_TITLE,
  },
  title: SITE_TITLE,
  twitter: {
    creator: '@beecast_ai',
    description: SITE_DESCRIPTION,
    title: SITE_TITLE,
  },
  ...(process.env.NODE_ENV === 'development'
    ? { metadataBase: new URL('http://localhost:3000') }
    : {}),
});
