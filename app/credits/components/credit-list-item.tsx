'use client';

import { createCheckoutSession } from '@/lib/services/stripe/checkout';
import { Badge, Button, Flex, Text } from '@radix-ui/themes';
import { atom, useAtom } from 'jotai';

type Props = {
  amount: number;
  id: string;
  popular?: boolean;
  quantity: number;
};

const checkoutStatusAtom = atom<
  { id: string; type: 'loading' } | { type: 'idle' }
>({
  type: 'idle',
});

export function CreditListItem({ amount, id, popular, quantity }: Props) {
  const [checkoutStatus, setCheckoutStatus] = useAtom(checkoutStatusAtom);

  const handleClick = async () => {
    try {
      setCheckoutStatus({ id, type: 'loading' });

      const checkoutSession = await createCheckoutSession({
        baseUrl: `${window.location.origin}/credits`,
        priceId: id,
      });

      if (!checkoutSession.url) {
        setCheckoutStatus({ type: 'idle' });
        return;
      }

      window.location.href = checkoutSession.url;
    } catch (error) {
      setCheckoutStatus({ type: 'idle' });
    }
  };

  return (
    <Flex align="center" direction="row" justify="between">
      <Flex direction="column" gap="1">
        <Flex align="center" gap="1">
          <Text size="3" weight="medium">
            {quantity} credits
          </Text>

          {popular ? <Badge color="mint">Most popular</Badge> : null}
        </Flex>

        <Text color="gray" size="2">
          ${(amount / quantity).toFixed(2)} per episode summarization.
        </Text>
      </Flex>

      <Button
        data-disabled={checkoutStatus.type === 'loading' ? 'true' : undefined}
        highContrast
        onClick={handleClick}
        size="2"
        style={{ minWidth: 64 }}
        variant="soft"
      >
        {checkoutStatus.type === 'loading' && checkoutStatus.id === id
          ? 'Loading...'
          : `$${amount}`}
      </Button>
    </Flex>
  );
}
