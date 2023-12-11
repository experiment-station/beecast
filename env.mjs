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
  GIT_SHA: z.string().min(1).default(getGitSha()),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_URL: z.string().min(1),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  const message = '❌ Invalid environment variables';
  console.error(message, JSON.stringify(envValidation.error.format(), null, 2));
  throw new Error(envValidation.error.message);
}

export const env = envValidation.data;
