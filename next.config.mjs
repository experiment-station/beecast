import { withSentryConfig } from '@sentry/nextjs';

import './env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      destination:
        'https://experiment-station.notion.site/Privacy-Policy-for-Beecast-c69c47d343694b8884eede01f8a61341?pvs=4',
      permanent: false,
      source: '/privacy-policy',
    },
    {
      destination:
        'https://experiment-station.notion.site/Terms-of-Service-for-Beecast-85524ec372614383b4d86156e47e5df7?pvs=4',
      permanent: false,
      source: '/terms-of-service',
    },
  ],
};

export default withSentryConfig(
  nextConfig,
  {
    org: 'experiment-station',
    project: 'beecast',
    silent: true,
  },
  {
    automaticVercelMonitors: true,
    disableLogger: true,
    hideSourceMaps: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    widenClientFileUpload: true,
  },
);
