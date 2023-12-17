'use server';

import type { Session, User } from '@supabase/supabase-js';

import { DatabaseError } from '@/lib/errors';
import { differenceInMinutes } from 'date-fns';
import { cookies } from 'next/headers';
import { z } from 'zod';

import { notifySlack } from './notify/slack';
import { getUser } from './supabase/auth';
import { createSupabaseServerClient } from './supabase/server';

type UserMetadata = {
  avatar_url?: string;
  name?: string;
  preferred_username?: string;
  provider_id?: string;
  user_name?: string;
};

export const updateAccount = async ({
  session,
  user,
}: {
  session: Session;
  user: User;
}) => {
  const metadata = user.user_metadata as UserMetadata;
  const supabase = createSupabaseServerClient(cookies());

  const { data, error } = await supabase
    .from('account')
    .upsert(
      {
        avatar_url: metadata.avatar_url || '',
        name:
          metadata.preferred_username || metadata.user_name || user.email || '',
        provider_refresh_token: session.provider_refresh_token || '',
        provider_token: session.provider_token || '',
        user_id: user.id,
      },
      { onConflict: 'user_id' },
    )
    .select('name, created_at')
    .single();

  if (error) {
    throw new DatabaseError(error);
  }

  const isNewAccount =
    differenceInMinutes(new Date(), new Date(data.created_at)) <= 5;

  if (isNewAccount) {
    await notifySlack(`🐝 New sign-up for *beecast*: ${data.name}`);
  }

  return { isNewAccount };
};

export const getAccountId = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('id')
    .eq('user_id', (await getUser()).id)
    .single();

  if (accountQuery.error) {
    throw new DatabaseError(accountQuery.error);
  }

  return accountQuery.data.id;
};

export const fetchAccount = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('*')
    .eq('user_id', (await getUser()).id)
    .single();

  if (accountQuery.error) {
    throw new DatabaseError(accountQuery.error);
  }

  return accountQuery.data;
};

export const fetchAccountAICredits = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('ai_credit')
    .eq('user_id', (await getUser()).id)
    .single();

  if (accountQuery.error) {
    throw new DatabaseError(accountQuery.error);
  }

  return accountQuery.data.ai_credit;
};

export const validateAccountAICredits = async () => {
  const aiCredits = await fetchAccountAICredits();

  const accountCreditsSchema = z.number().int().positive();
  const validatedCredits = accountCreditsSchema.safeParse(aiCredits);

  if (!validatedCredits.success) {
    throw validatedCredits.error;
  }

  return validatedCredits.data;
};

export const updateAccountAICredits = async (amount: number) => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .update({ ai_credit: amount })
    .eq('user_id', (await getUser()).id)
    .select('ai_credit')
    .single();

  if (accountQuery.error) {
    throw new DatabaseError(accountQuery.error);
  }

  return accountQuery.data.ai_credit;
};
