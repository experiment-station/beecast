import { env } from '@/env.mjs';
import { DatabaseError } from '@/lib/errors';
import { cookies } from 'next/headers';
import { ofetch } from 'ofetch';

import { fetchAccount } from '../account';
import { createSupabaseServerClient } from '../supabase/server';

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export const spotifyFetchClient = ofetch.create({
  baseURL: SPOTIFY_BASE_URL,
  params: { limit: 50, offset: 0 },
});

export const refreshToken = async (providerRefreshToken: string) => {
  const supabase = createSupabaseServerClient(cookies());
  const account = await fetchAccount();

  const bearer = Buffer.from(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
  ).toString('base64');

  try {
    const response = await ofetch<RefreshTokenResponse>(
      'https://accounts.spotify.com/api/token',
      {
        body: `grant_type=refresh_token&refresh_token=${providerRefreshToken}`,
        headers: {
          Authorization: `Basic ${bearer}`,
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
      },
    );

    const { data, error } = await supabase
      .from('account')
      .update({ provider_token: response.access_token })
      .eq('id', account.id)
      .select()
      .single();

    if (error) {
      throw new DatabaseError(error);
    }

    return data.provider_token;
  } catch (error) {
    throw new Error('Could not get new access token');
  }
};
