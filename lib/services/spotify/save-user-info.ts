import type { Session, User } from '@supabase/supabase-js';

import { DatabaseError } from '@/lib/errors';
import { differenceInMinutes } from 'date-fns';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { notifySlack } from '../notify/slack';
import { createSupabaseServerClient } from '../supabase/server';

type UserMetadata = {
  avatar_url?: string;
  full_name?: string;
  provider_id?: string;
};

const spotifyUserInfoResponseSchema = z.object({
  avatar_url: z.string().default(''),
  full_name: z.string().default(''),
  provider_id: z.string().min(1),
  provider_token: z.string().min(1),
});

export const saveUserInfo = async ({
  session,
  user,
}: {
  session: Session;
  user: User;
}) => {
  const providerToken = session.provider_token;
  const userMetadata: UserMetadata = user.user_metadata;

  const validatedResponse = spotifyUserInfoResponseSchema.safeParse({
    avatar_url: userMetadata.avatar_url,
    full_name: userMetadata.full_name,
    provider_id: userMetadata.provider_id,
    provider_token: providerToken,
  });

  if (!validatedResponse.success) {
    throw validatedResponse.error;
  }

  const userInfo = validatedResponse.data;
  const supabase = createSupabaseServerClient(cookies());

  const { data, error } = await supabase
    .from('account')
    .upsert(
      {
        avatar_url: userInfo.avatar_url,
        display_name: userInfo.full_name,
        provider_refresh_token: session.provider_refresh_token,
        provider_token: userInfo.provider_token,
        spotify_id: userInfo.provider_id,
        user_id: user.id,
      },
      { onConflict: 'spotify_id' },
    )
    .select('display_name, created_at')
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  const isNewAccount =
    differenceInMinutes(new Date(), new Date(data.created_at)) <= 5;

  if (isNewAccount) {
    await notifySlack(`🐝 New sign-up for *beecast*: ${data.display_name}`);
  }

  return { isNewAccount };
};
