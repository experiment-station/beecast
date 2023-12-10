import type { PropsWithChildren } from 'react';

import { Box } from '@radix-ui/themes';

import { AppContent } from './app-content';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="sticky">
        <AppHeader variant="guest" />
      </header>

      <main>
        <AppContent>
          <Box my="6">{children}</Box>
        </AppContent>
      </main>

      <footer>
        <AppFooter />
      </footer>
    </>
  );
}
