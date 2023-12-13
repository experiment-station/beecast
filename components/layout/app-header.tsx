import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Flex,
  Text,
} from '@radix-ui/themes';
import Link from 'next/link';

import { UnstyledButton } from '../ui/unstyled-button';
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
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Avatar
          fallback={<PersonIcon />}
          radius="full"
          src={props.user.avatarURL}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        highContrast
        style={{
          minWidth: 200,
        }}
      >
        <DropdownMenuLabel asChild>
          <Flex align="start" direction="column" height="auto">
            <Text color="gray" highContrast weight="medium">
              {props.user.username}
            </Text>

            <Text color="gray">
              {props.user.credits === 0 ? 'No' : props.user.credits} credits
              remaining
            </Text>
          </Flex>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>Your episodes</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />

        <form action="/auth/sign-out" method="POST">
          <DropdownMenuItem color="red">
            <UnstyledButton type="submit">Sign out</UnstyledButton>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}

function AppHeaderActionsGuest() {
  return (
    <Button asChild highContrast>
      <Link href="/sign-in">
        Get started
        <ArrowRightIcon />
      </Link>
    </Button>
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
