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
  IconButton,
  Text,
} from '@radix-ui/themes';
import Link from 'next/link';
import {
  CgArrowRight,
  CgLogOut,
  CgMediaPodcast,
  CgProfile,
} from 'react-icons/cg';
import { PiRobotBold } from 'react-icons/pi';

import { Logo } from '../ui/logo';
import { UnstyledButton } from '../ui/unstyled-button';
import { AppContent } from './app-content';

type Props =
  | {
      user: {
        avatarURL?: string;
        credits: number;
        name: string;
      };
      variant: 'authenticated';
    }
  | {
      variant: 'guest';
    };

const USER_MENU_LINKS = [
  {
    href: '/shows',
    icon: <CgMediaPodcast />,
    label: 'Your shows',
  },
  {
    href: '/credits',
    icon: <PiRobotBold />,
    label: 'Buy credits',
  },
];

function AppHeaderActionsAuthenticated(
  props: Pick<Exclude<Props, { variant: 'guest' }>, 'user'>,
) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <IconButton radius="full" size="1" tabIndex={-1} variant="ghost">
          <Avatar
            fallback={<CgProfile />}
            radius="full"
            size="2"
            src={props.user.avatarURL}
          />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        highContrast
        size="2"
        style={{
          minWidth: 120,
        }}
      >
        <DropdownMenuLabel asChild>
          <Flex align="start" direction="column" height="auto">
            <Text color="gray" highContrast weight="medium">
              {props.user.name}
            </Text>

            <Text color="gray" size="1">
              {props.user.credits === 0 ? 'No' : props.user.credits} credits
              remaining
            </Text>
          </Flex>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {USER_MENU_LINKS.map((link) => (
          <DropdownMenuItem asChild key={link.href}>
            <Link href={link.href}>
              <Flex align="center" gap="2">
                {link.icon}
                <Text>{link.label}</Text>
              </Flex>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <form action="/auth/sign-out" method="POST">
          <DropdownMenuItem color="red">
            <UnstyledButton type="submit">
              <Flex align="center" gap="2">
                <CgLogOut />
                <Text>Sign out</Text>
              </Flex>
            </UnstyledButton>
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
        <CgArrowRight />
      </Link>
    </Button>
  );
}

export function AppHeader(props: Props) {
  return (
    <Flex direction="column" gap="4" py="4">
      <AppContent>
        <Flex align="center" justify="between">
          <Link href="/" style={{ lineHeight: 1 }}>
            <Logo size={36} />
          </Link>

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
