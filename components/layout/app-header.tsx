import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';

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
    <header className="sticky">
      <Flex direction="column" gap="4" mt="4">
        <Container
          px={{
            initial: '6',
            lg: '0',
          }}
          size="4"
        >
          <Flex align="center" justify="between">
            <Flex align="center" asChild gap="2">
              <Link
                href="/"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Image
                  alt="beecast.ai logo"
                  height="48"
                  src="/beecast.png"
                  style={{ display: 'block' }}
                  width="48"
                />

                <Heading size="5" weight="medium">
                  Beecast
                </Heading>
              </Link>
            </Flex>

            {props.variant === 'authenticated' ? (
              <AppHeaderActionsAuthenticated {...props} />
            ) : (
              <AppHeaderActionsGuest />
            )}
          </Flex>
        </Container>
      </Flex>
    </header>
  );
}
