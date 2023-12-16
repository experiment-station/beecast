import { z } from 'zod';

import { StripeError, stripe } from './client';

const getProduct = async () => {
  const product = (await stripe.products.list()).data.find(
    (p) => p.metadata.project === 'beecast',
  );

  if (!product) {
    throw new StripeError('Product not found!');
  }

  return product;
};

const priceSchema = z
  .object({
    active: z.literal<boolean>(true),
    currency: z.string(),
    id: z.string(),
    transform_quantity: z.object({
      divide_by: z.number(),
    }),
    unit_amount: z.number(),
  })
  .transform((data) => ({
    amount: data.unit_amount,
    credits: data.transform_quantity.divide_by,
    currency: data.currency,
    id: data.id,
  }));

export const getPrices = async () => {
  const product = await getProduct();
  const prices = await stripe.prices.list({
    product: product.id,
  });

  return prices.data
    .map((price) => priceSchema.safeParse(price))
    .filter((p): p is Exclude<typeof p, { success: false }> => p.success)
    .map((price) => price.data)
    .sort((a, b) => a.amount - b.amount);
};
