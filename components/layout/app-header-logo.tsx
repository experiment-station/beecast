import { Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';

import { Logo } from '../logo';

export function AppHeaderLogo() {
  return (
    <Flex align="center" asChild gap="2">
      <Link
        href="/"
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <Logo />

        <Heading size="5" weight="medium">
          Beecast
        </Heading>
      </Link>
    </Flex>
  );
}
