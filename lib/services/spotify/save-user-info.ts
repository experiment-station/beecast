import type { Session, User } from '@supabase/supabase-js';

import { BadRequestError, InternalServerError } from '@/lib/errors';
import { cookies } from 'next/headers';

import { createSupabaseServerClient } from '../supabase/server';

type UserMetadata = {
  avatar_url?: string;
  full_name?: string;
  provider_id?: string;
};

export const saveUserInfo = async ({
  session,
  user,
}: {
  session: Session;
  user: User;
}) => {
  const providerToken = session.provider_token;
  const userMetadata: UserMetadata = user.user_metadata;

  if (
    !providerToken ||
    !userMetadata.avatar_url ||
    !userMetadata.full_name ||
    !userMetadata.provider_id
  ) {
    throw new BadRequestError({
      message: 'Missing user info',
    });
  }

  const supabase = createSupabaseServerClient(cookies());

  const { error } = await supabase
    .from('account')
    .upsert(
      {
        avatar_url: userMetadata.avatar_url,
        display_name: userMetadata.full_name,
        provider_refresh_token: session.provider_refresh_token,
        provider_token: providerToken,
        spotify_id: userMetadata.provider_id,
        user_id: user.id,
      },
      { onConflict: 'spotify_id' },
    )
    .select();

  if (error) {
    throw new InternalServerError({ error });
  }
};
