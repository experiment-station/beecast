'use server';

import { getAccountId } from '../account';
import { getUser } from '../supabase/auth';
import { stripe } from './client';

export const createCheckoutSession = async ({
  baseUrl,
  priceId,
}: {
  baseUrl: string;
  priceId: string;
}) => {
  const user = await getUser();
  const accountId = await getAccountId();

  const checkoutSession = await stripe.checkout.sessions.create({
    cancel_url: `${baseUrl}?status=cancel`,
    customer_email: user.email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      accountId,
      userId: user.id,
    },
    mode: 'payment',
    success_url: `${baseUrl}?status=success`,
  });

  return {
    url: checkoutSession.url,
  };
};
