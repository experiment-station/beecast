import { fetchAccountAICredits } from '@/lib/services/account';
import { getPrices } from '@/lib/services/stripe/prices';
import { Box, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { Provider } from 'jotai';

import { CreditListItem } from './components/credit-list-item';

export default async function Page() {
  const credits = await fetchAccountAICredits();
  const prices = await getPrices();

  return (
    <Box mx="auto" style={{ maxWidth: 'var(--container-1)' }}>
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
    </Box>
  );
}
