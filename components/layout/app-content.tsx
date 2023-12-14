import type { PropsWithChildren } from 'react';

import { Container } from '@radix-ui/themes';

export function AppContent(props: PropsWithChildren) {
  return (
    <Container
      px={{
        initial: '6',
        lg: '0',
        md: '3',
      }}
      size="3"
    >
      {props.children}
    </Container>
  );
}
