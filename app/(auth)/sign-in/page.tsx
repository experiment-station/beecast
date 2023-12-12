import { Button, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { FaSpotify } from 'react-icons/fa';

export default function Page() {
  return (
    <Flex direction="column" gap="4">
      <Heading>Welcome to Beecast</Heading>

      <Text color="gray" size="4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod
        quia quibusdam quos quae.
      </Text>

      <form action="/auth/sign-in" method="POST">
        <Flex direction="column">
          <Button highContrast size="3" type="submit">
            <FaSpotify />
            Continue with Spotify
          </Button>
        </Flex>
      </form>

      <Text color="gray" size="1">
        By clicking continue, you acknowledge that you have read and understood,
        and agree to our{' '}
        <Link href="/terms-of-service" target="_blank">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        .
      </Text>
    </Flex>
  );
}
