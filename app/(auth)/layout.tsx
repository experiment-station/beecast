import type { PropsWithChildren } from 'react';

import { Logo } from '@/components/logo';
import { Container, Flex } from '@radix-ui/themes';

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <Container size="1">
      <Flex
        direction="column"
        gap="4"
        mx="auto"
        style={{
          alignItems: 'start',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Logo size={64} />
        {props.children}
      </Flex>
    </Container>
  );
}
