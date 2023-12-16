import type { Metadata } from 'next';

export const SITE_NAME = 'beecast.ai';
export const SITE_DESCRIPTION = 'Your hard-working AI podcast companion';
export const SITE_TITLE = 'beecast';

const SITE_URL = process.env.VERCEL_URL || 'http://localhost:3000';

export const getDefaultMetadata = (): Metadata => ({
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    description: SITE_DESCRIPTION,
    title: SITE_TITLE,
    url: SITE_URL,
  },
  title: SITE_TITLE,
  twitter: {
    creator: '@beecast_ai',
    description: SITE_DESCRIPTION,
    title: SITE_TITLE,
  },
});
