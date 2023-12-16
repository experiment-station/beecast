import * as Sentry from '@sentry/nextjs';

Sentry.init({
  debug: false,
  dsn: 'https://af70235245541c8c764244d53aae20ce@o4506407271137280.ingest.sentry.io/4506407274676224',
  integrations: [
    new Sentry.Replay(),
    new Sentry.GlobalHandlers({ onerror: false, onunhandledrejection: false }),
  ],
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracesSampleRate: 0.1,
});
