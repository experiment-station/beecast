'use server';

import { StripeError, stripe } from './client';

const getProduct = async () => {
  const products = await stripe.products.list();
  const product = products.data.find((p) => p.metadata.project === 'beecast');

  if (!product) {
    throw new StripeError('Product not found!');
  }

  return product;
};

export const getPrices = async () => {
  const product = await getProduct();
  const prices = await stripe.prices.list({ product: product.id });
  return prices.data
    .filter((p) => p.active)
    .sort((a, b) => a.unit_amount! - b.unit_amount!);
};
