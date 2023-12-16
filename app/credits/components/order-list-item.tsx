import type { Tables } from '@/types/supabase/database';

import { Button, Flex, Text } from '@radix-ui/themes';
import { format } from 'date-fns';
import Link from 'next/link';

import { getCurrencySymbol } from '../utils/get-currency-symbol';

type Props = Tables<'order'>;

export function OrderListItem(props: Props) {
  const fixedAmount = props.amount / 100;
  const symbolizedCurrency = getCurrencySymbol(props.currency);

  return (
    <Flex align="center" direction="row" justify="between">
      <Flex direction="column" gap="1">
        <Flex align="center" gap="1">
          <Text size="3" weight="medium">
            {props.credits} credits for{' '}
            <Text>
              {symbolizedCurrency}
              {fixedAmount}
            </Text>
          </Text>
        </Flex>

        <Text color="gray" size="2">
          {format(new Date(props.created_at), 'HH:mm - MMM d, yyyy')}
        </Text>
      </Flex>

      <Button
        asChild
        highContrast
        size="2"
        style={{ minWidth: 64 }}
        variant="soft"
      >
        <Link href={props.invoice_url} target="_blank">
          Receipt
        </Link>
      </Button>
    </Flex>
  );
}
