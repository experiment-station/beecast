import type { PropsWithChildren } from 'react';

import { Container } from '@radix-ui/themes';

export function AppContent(props: PropsWithChildren) {
  return (
    <Container
      px={{
        initial: '6',
        lg: '0',
      }}
      size="4"
    >
      {props.children}
    </Container>
  );
}
