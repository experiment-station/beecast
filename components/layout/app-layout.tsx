import type { PropsWithChildren } from 'react';

import { Container } from '@radix-ui/themes';

import { AppHeader } from './app-header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader variant="guest" />

      <Container
        my="6"
        px={{
          initial: '6',
          lg: '0',
        }}
        size="4"
      >
        {children}
      </Container>
    </>
  );
}
