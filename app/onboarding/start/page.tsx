import { Logo } from '@/components/ui/logo';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default function Page() {
  return (
    <Flex direction="row" style={{ justifyContent: 'center' }}>
      <Flex
        direction="column"
        gap="2"
        style={{
          width: 580,
        }}
      >
        <Flex align="center" direction="row" gap="2">
          <Heading size="6">Welcome to Beecast</Heading>
          <Logo size={24} />
        </Flex>

        <Text size="3">
          Would you like to see your favorite podcasts and personalize your
          podcast experience?
        </Text>

        <Flex direction="row" gap="2" justify="end">
          <Link href="/">
            <Button color="gray" variant="surface">
              Maybe later
            </Button>
          </Link>
          <Button highContrast>Absolutely!</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
