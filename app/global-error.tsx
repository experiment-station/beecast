'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error, {
      tags: {
        global: true,
      },
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* @ts-expect-error - https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#react-render-errors-in-app-router */}
        <Error />
      </body>
    </html>
  );
}
