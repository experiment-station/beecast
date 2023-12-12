import { cookies } from 'next/headers';

import { createSupabaseServerClient } from './supabase/server';

const getUserId = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const userQuery = await supabase.auth.getUser();

  if (userQuery.error) {
    throw new Error(userQuery.error.message);
  }

  return userQuery.data.user.id;
};

export const getAccountId = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('id')
    .eq('user_id', await getUserId())
    .single();

  if (accountQuery.error) {
    throw new Error(accountQuery.error.message);
  }

  return accountQuery.data.id;
};

export const fetchAccount = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('*')
    .eq('user_id', await getUserId())
    .single();

  if (accountQuery.error) {
    throw new Error(accountQuery.error.message);
  }

  return accountQuery.data;
};

export const fetchAccountAICredits = async () => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .select('ai_credit')
    .eq('user_id', await getUserId())
    .single();

  if (accountQuery.error) {
    throw new Error(accountQuery.error.message);
  }

  return accountQuery.data.ai_credit || 0;
};

export const validateAccountAICredits = async () => {
  const aiCredits = await fetchAccountAICredits();

  if (aiCredits <= 0) {
    throw new Error('User does not have any AI credits');
  }

  return aiCredits;
};

export const updateAccountAICredits = async (amount: number) => {
  const supabase = createSupabaseServerClient(cookies());

  const accountQuery = await supabase
    .from('account')
    .update({ ai_credit: amount })
    .eq('user_id', await getUserId())
    .select('ai_credit')
    .single();

  if (accountQuery.error) {
    throw new Error(accountQuery.error.message);
  }

  return accountQuery.data.ai_credit || 0;
};
