import { DatabaseError } from '@/lib/errors';
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
  Separator,
  Text,
} from '@radix-ui/themes';
import { Provider } from 'jotai';
import { cookies } from 'next/headers';
import { FaCircleCheck } from 'react-icons/fa6';

import { CreditListItem } from './components/credit-list-item';

type Props = {
  searchParams: {
    status?: string;
  };
};

export default async function Page(props: Props) {
  const supabase = createSupabaseServerClient(cookies());
  const credits = await fetchAccountAICredits();
  const prices = await getPrices();
  const ordersQuery = await supabase.from('order').select('*');

  if (ordersQuery.error) {
    throw new DatabaseError(ordersQuery.error);
  }

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

      <Card size="3">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Heading as="h3" size="4" trim="both">
              Buy AI credits
            </Heading>

            <Text color="gray" size="2">
              You currently have <Text weight="medium">{credits}</Text> credits.
            </Text>
          </Flex>

          <Separator orientation="horizontal" size="4" />

          <Provider>
            <Flex direction="column" gap="4">
              {prices.map((price, index) => (
                <CreditListItem
                  amount={price.unit_amount! / 100}
                  id={price.id}
                  key={price.id}
                  popular={index === 1}
                  quantity={price.transform_quantity!.divide_by}
                />
              ))}
            </Flex>
          </Provider>
        </Flex>
      </Card>

      {ordersQuery.data.length > 0 ? (
        <Card size="3">
          <Flex direction="column" gap="4">
            <Flex direction="column" gap="2">
              <Heading as="h3" size="4" trim="both">
                Orders
              </Heading>

              <Text color="gray" size="2">
                You have <Text weight="medium">{ordersQuery.data.length}</Text>{' '}
                orders.
              </Text>
            </Flex>

            <Separator orientation="horizontal" size="4" />

            <Flex direction="column" gap="4">
              {ordersQuery.data.map((order) => (
                <div key={order.id}>{JSON.stringify(order)}</div>
              ))}
            </Flex>
          </Flex>
        </Card>
      ) : null}
    </Flex>
  );
}
