import type { PropsWithChildren } from 'react';

import { Box } from '@radix-ui/themes';

import { AppContent } from './app-content';
import { AppHeader } from './app-header';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader variant="guest" />

      <AppContent>
        <Box my="6">{children}</Box>
      </AppContent>
    </>
  );
}
