// @ts-check

import { z } from 'zod';

const getGitSha = () => {
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return process.env.VERCEL_GIT_COMMIT_SHA;
  }

  if (process.env.GITHUB_SHA) {
    return process.env.GITHUB_SHA;
  }

  return 'dev';
};

const envSchema = z.object({
  DEEPGRAM_API_KEY: z.string().min(1),
  GIT_SHA: z.string().min(1).default(getGitSha()),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  OPENAI_API_KEY: z.string().min(1),
  // We don't have these configurations yet.
  SUPABASE_SERVICE_ROLE_KEY: z.string().default(''),
  SUPABASE_URL: z.string().default(''),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  const message = '❌ Invalid environment variables';
  console.error(message, JSON.stringify(envValidation.error.format(), null, 2));
  throw new Error(envValidation.error.message);
}

export const env = envValidation.data;
