import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons';
import { Avatar, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

import { AppContent } from './app-content';
import { AppHeaderLogo } from './app-header-logo';

type Props =
  | {
      user: {
        avatarURL?: string;
        credits: number;
        username: string;
      };
      variant: 'authenticated';
    }
  | {
      variant: 'guest';
    };

function AppHeaderActionsAuthenticated(
  props: Pick<Exclude<Props, { variant: 'guest' }>, 'user'>,
) {
  return (
    <Flex align="center" gap="2">
      <Flex align="end" direction="column">
        <Text size="2" weight="medium">
          {props.user.username}
        </Text>

        <Text color="gray" size="2">
          {props.user.credits === 0 ? 'No' : props.user.credits} credits
          remaining
        </Text>
      </Flex>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            fallback={<PersonIcon />}
            radius="full"
            src={props.user.avatarURL}
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>Buy credits</DropdownMenu.Item>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">Sign out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}

function AppHeaderActionsGuest() {
  return (
    <Flex gap="2">
      <Button asChild variant="soft">
        <Link href="/sign-in">Sign in</Link>
      </Button>

      <Button asChild>
        <Link href="/sign-up">
          Get started
          <ArrowRightIcon />
        </Link>
      </Button>
    </Flex>
  );
}

export function AppHeader(props: Props) {
  return (
    <Flex direction="column" gap="4" py="4">
      <AppContent>
        <Flex align="center" justify="between">
          <AppHeaderLogo />

          {props.variant === 'authenticated' ? (
            <AppHeaderActionsAuthenticated {...props} />
          ) : (
            <AppHeaderActionsGuest />
          )}
        </Flex>
      </AppContent>
    </Flex>
  );
}
