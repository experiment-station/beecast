import type { NextRequest } from 'next/server';
import type Stripe from 'stripe';

import { env } from '@/env.mjs';
import { HttpBadRequestError, HttpInternalServerError } from '@/lib/errors';
import { stripe } from '@/lib/services/stripe/client';
import { fulfillOrder } from '@/lib/services/stripe/orders';

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new HttpBadRequestError({
      message: 'Missing Stripe signature',
    }).toNextResponse();
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new HttpBadRequestError({
      message: 'Invalid payload',
    }).toNextResponse();
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ['line_items'],
          },
        );

        if (session.payment_status === 'paid') {
          await fulfillOrder(session);
        }

        break;
      }

      default:
        break;
    }
  } catch (error) {
    return new HttpInternalServerError({
      error,
    }).toNextResponse();
  }

  return new Response('OK');
}
