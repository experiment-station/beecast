// @ts-check
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const getGitSha = () =>
  process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || 'dev';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  },
  runtimeEnv: {
    DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
    GIT_SHA: getGitSha(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PODCAST_INDEX_API_KEY: process.env.PODCAST_INDEX_API_KEY,
    PODCAST_INDEX_SECRET: process.env.PODCAST_INDEX_SECRET,
    SLACK_POSTMAN_WEBHOOK_URL: process.env.SLACK_POSTMAN_WEBHOOK_URL,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
  server: {
    DEEPGRAM_API_KEY: z.string().min(1),
    GIT_SHA: z.string().min(1).default(getGitSha()),
    OPENAI_API_KEY: z.string().min(1),
    PODCAST_INDEX_API_KEY: z.string().min(1),
    PODCAST_INDEX_SECRET: z.string().min(1),
    SLACK_POSTMAN_WEBHOOK_URL: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    SUPABASE_URL: z.string().min(1),
  },
});
