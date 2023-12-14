import { Button, DialogClose, Flex, Heading, Text } from '@radix-ui/themes';

import { Logo } from './ui/logo';

export function OnboardingModal() {
  return (
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
        <DialogClose>
          <Button color="gray" variant="surface">
            Maybe later
          </Button>
        </DialogClose>
        <Button highContrast>Absolutely!</Button>
      </Flex>
    </Flex>
  );
}
