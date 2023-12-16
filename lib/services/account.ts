'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

import { DatabaseError } from '../errors';
import { getUser } from './supabase/auth';
import { createSupabaseServerClient } from './supabase/server';

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

  return accountQuery.data.ai_credit || 0;
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

  return accountQuery.data.ai_credit || 0;
};
