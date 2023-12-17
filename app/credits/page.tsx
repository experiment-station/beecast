import { fetchAccountAICredits } from '@/lib/services/account';
import { getPrices } from '@/lib/services/stripe/prices';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import {
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Strong,
  Text,
} from '@radix-ui/themes';
import { Provider } from 'jotai';
import { cookies } from 'next/headers';
import { FaInfoCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';

import { CreditListItem } from './components/credit-list-item';
import { OrderListItem } from './components/order-list-item';

type Props = {
  searchParams: {
    status?: string;
  };
};

export default async function Page(props: Props) {
  const supabase = createSupabaseServerClient(cookies());
  const credits = await fetchAccountAICredits();
  const prices = await getPrices();
  const ordersQuery = await supabase
    .from('order')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <Flex direction="column" gap="5">
      {props.searchParams.status === 'success' ? (
        <CalloutRoot color="green">
          <CalloutIcon>
            <FaCircleCheck />
          </CalloutIcon>
          <CalloutText>
            Your payment was successful! We added the credits to your account.
          </CalloutText>
        </CalloutRoot>
      ) : null}

      <CalloutRoot color="gray">
        <CalloutIcon>
          <FaInfoCircle />
        </CalloutIcon>

        <CalloutText>
          Our payment system is currently running on test mode. You can buy
          credits for free by using the{' '}
          <Link href="https://stripe.com/docs/testing#cards" target="_blank">
            mock credit card numbers
          </Link>
          .{' '}
          <Strong>
            However, you have a remaining limit of{' '}
            {credits.ai_credit_remaining_usage} credit(s) to run the AI thingy.
          </Strong>
        </CalloutText>
      </CalloutRoot>

      <Card size="3">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Heading as="h3" size="4" trim="both">
              Buy AI credits
            </Heading>

            <Text color="gray" size="2">
              You have <Text weight="medium">{credits.ai_credit}</Text> credits.
            </Text>
          </Flex>

          <Separator orientation="horizontal" size="4" />

          <Provider>
            <Flex direction="column" gap="4">
              {prices.map((price, index) => (
                <CreditListItem
                  amount={price.amount}
                  currency={price.currency}
                  id={price.id}
                  key={price.id}
                  popular={index === 1}
                  quantity={price.credits}
                />
              ))}
            </Flex>
          </Provider>
        </Flex>
      </Card>

      {(ordersQuery.data || []).length > 0 ? (
        <Card size="3">
          <Flex direction="column" gap="4">
            <Heading as="h3" size="4" trim="both">
              Your orders
            </Heading>

            <Separator orientation="horizontal" size="4" />

            <Flex direction="column" gap="4">
              {(ordersQuery.data || []).map((order) => (
                <OrderListItem key={order.id} {...order} />
              ))}
            </Flex>
          </Flex>
        </Card>
      ) : null}
    </Flex>
  );
}
