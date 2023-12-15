import { env } from '@/env.mjs';
import { createExternalServiceError } from '@/lib/errors';
import { Stripe } from 'stripe';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const StripeError = createExternalServiceError('Stripe');
