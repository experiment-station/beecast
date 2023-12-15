import { RouteModal } from '@/components/route-modal';
import { Logo } from '@/components/ui/logo';
import { Button, DialogClose, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

export default function Page() {
  return (
    <RouteModal>
      <Flex direction="column" gap="2">
        <Flex align="center" direction="row" gap="1">
          <Heading size="6">Welcome to Beecast</Heading>
          <Logo size={24} />
        </Flex>

        <Text size="3">
          Would you like to see your favorite podcasts and personalize your
          podcast experience?
        </Text>

        <Flex direction="row" gap="2" justify="end">
          <Link href="/">
            <DialogClose>
              <Button color="gray" variant="surface">
                Maybe later
              </Button>
            </DialogClose>
          </Link>
          <Button highContrast>Absolutely!</Button>
        </Flex>
      </Flex>
    </RouteModal>
  );
}
