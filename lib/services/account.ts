import type { Tables } from '@/types/supabase/database';

import { cookies } from 'next/headers';

import { createSupabaseServerClient } from './supabase/server';

export const fetchAccountAICredits = async (
  accountId: Tables<'account'>['id'],
) => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('ai_credit')
    .eq('id', accountId)
    .single();

  if (accountQuery.error) {
    throw new Error(accountQuery.error.message);
  }

  return accountQuery.data.ai_credit || 0;
};

export const validateAccountAICredits = async (
  accountId: Tables<'account'>['id'],
) => {
  const aiCredits = await fetchAccountAICredits(accountId);

  if (aiCredits <= 0) {
    throw new Error('User does not have any AI credits');
  }

  return aiCredits;
};

export const updateAccountAICredits = async (
  accountId: Tables<'account'>['id'],
  amount: number,
) => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .update({ ai_credit: amount })
    .eq('id', accountId)
    .select('ai_credit')
    .single();

  if (accountQuery.error) {
    throw new Error(accountQuery.error.message);
  }

  return accountQuery.data.ai_credit || 0;
};
