import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://af70235245541c8c764244d53aae20ce@o4506407271137280.ingest.sentry.io/4506407274676224',
  tracesSampleRate: 0.5,
});
