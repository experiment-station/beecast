import type { PropsWithChildren } from 'react';

import { Logo } from '@/components/ui/logo';
import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <Container size="1">
      <Flex
        direction="column"
        gap="4"
        mx="auto"
        px={{
          initial: '5',
          lg: '0',
          md: '3',
        }}
        style={{
          alignItems: 'start',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Link
          href="/"
          style={{
            lineHeight: 1,
          }}
          title="Go to home page"
        >
          <Logo size={64} />
        </Link>

        {props.children}
      </Flex>
    </Container>
  );
}
