import type { PropsWithChildren } from 'react';

import { Box, Flex } from '@radix-ui/themes';

import { AppContent } from './app-content';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <Flex
      direction="column"
      style={{
        minHeight: '100vh',
      }}
    >
      <header className="sticky">
        <AppHeader variant="guest" />
      </header>

      <main>
        <AppContent>
          <Box my="6">{children}</Box>
        </AppContent>
      </main>

      <footer style={{ marginTop: 'auto' }}>
        <AppFooter />
      </footer>
    </Flex>
  );
}
