'use server';

import { stripe } from './client';

export const createCheckoutSession = async ({
  baseUrl,
  priceId,
}: {
  baseUrl: string;
  priceId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    cancel_url: `${baseUrl}?status=cancel`,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}?status=success`,
  });

  return session;
};
