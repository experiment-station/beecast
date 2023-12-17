import type { SignInWithOAuthCredentials } from '@supabase/supabase-js';

import { ENABLED_OAUTH_PROVIDERS } from '@/lib/services/supabase/auth';
import { Button, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { CgLogIn } from 'react-icons/cg';
import { FaSpotify } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';

type Props = {
  searchParams?: {
    redirect?: string;
  };
};

function AuthProviderLabel(props: {
  provider: SignInWithOAuthCredentials['provider'];
}) {
  switch (props.provider) {
    case 'spotify':
      return 'Spotify';

    case 'github':
      return 'GitHub';

    default:
      return props.provider;
  }
}

function AuthProviderIcon(props: {
  provider: SignInWithOAuthCredentials['provider'];
}) {
  switch (props.provider) {
    case 'spotify':
      return <FaSpotify />;

    case 'github':
      return <FaGithub />;

    default:
      return <CgLogIn />;
  }
}

export default function Page(props: Props) {
  return (
    <Flex direction="column" gap="4">
      <Heading trim="both">Welcome to beecast</Heading>

      <Text color="gray" size="4" trim="both">
        A more efficient way to listen podcasts.
      </Text>

      <Flex direction="column" gap="3">
        {ENABLED_OAUTH_PROVIDERS.map((provider) => (
          <div key={provider}>
            <form action={`/auth/sign-in/${provider}`} method="POST">
              <input
                name="redirect"
                type="hidden"
                value={props.searchParams?.redirect}
              />

              <Flex direction="column">
                <Button highContrast size="3" type="submit">
                  <AuthProviderIcon provider={provider} />
                  Continue with <AuthProviderLabel provider={provider} />
                </Button>
              </Flex>
            </form>
          </div>
        ))}
      </Flex>

      <Text color="gray" size="1" trim="both">
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
