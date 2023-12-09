// @ts-check
// Ensures that all environment variables are present and valid.

import { z } from 'zod';

const getGitSha = () => {
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    return process.env.VERCEL_GIT_COMMIT_SHA;
  }

  try {
    return require('node:child_process')
      .execSync('git rev-parse HEAD')
      .toString()
      .trim();
  } catch (error) {
    return 'unknown';
  }
};

const envSchema = z.object({
  GIT_SHA: z.string().min(1).default(getGitSha()),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  const message = '❌ Invalid environment variables';
  console.error(message, JSON.stringify(envValidation.error.format(), null, 2));
  throw new Error(envValidation.error.message);
}

export const env = envValidation.data;
