import type { Stripe } from 'stripe';

import { DatabaseError } from '@/lib/errors';
import { z } from 'zod';

import { createSupabaseServiceClient } from '../supabase/service';
import { stripe } from './client';

const checkoutSessionSchema = z.object({
  amount_total: z.number(),
  currency: z.string(),
  id: z.string(),
  line_items: z.object({
    data: z.array(
      z.object({
        price: z.object({
          transform_quantity: z.object({
            divide_by: z.number(),
          }),
        }),
      }),
    ),
  }),
  metadata: z.object({
    accountId: z.string().min(1).transform(Number),
    userId: z.string().min(1),
  }),
  payment_intent: z.string(),
});

export async function fulfillOrder(session: Stripe.Checkout.Session) {
  const validatedSession = checkoutSessionSchema.safeParse(session);

  if (!validatedSession.success) {
    throw validatedSession.error;
  }

  const supabase = createSupabaseServiceClient();

  const currentAccountCreditsQuery = await supabase
    .from('account')
    .select('ai_credit')
    .eq('id', validatedSession.data.metadata.accountId)
    .single();

  if (currentAccountCreditsQuery.error) {
    throw new DatabaseError(currentAccountCreditsQuery.error);
  }

  const purchasedCredits =
    validatedSession.data.line_items.data[0].price.transform_quantity.divide_by;

  const { data: charges } = await stripe.charges.list({
    payment_intent: validatedSession.data.payment_intent,
  });

  const charge = charges[0];

  const createOrderQuery = await supabase.from('order').insert({
    account: validatedSession.data.metadata.accountId,
    amount: validatedSession.data.amount_total,
    credits: purchasedCredits,
    currency: validatedSession.data.currency,
    invoice_url: charge.receipt_url ?? '',
    reference_id: validatedSession.data.id,
    status: 'paid',
  });

  if (createOrderQuery.error) {
    throw new DatabaseError(createOrderQuery.error);
  }

  const updateAccountQuery = await supabase
    .from('account')
    .update({
      ai_credit:
        (currentAccountCreditsQuery.data.ai_credit ?? 0) + purchasedCredits,
    })
    .eq('id', validatedSession.data.metadata.accountId);

  if (updateAccountQuery.error) {
    throw new DatabaseError(updateAccountQuery.error);
  }
}
