import type { PropsWithChildren } from 'react';

import { fetchAccount } from '@/lib/services/account';
import { getIsAuthenticated } from '@/lib/services/supabase/auth';
import { Box, Flex } from '@radix-ui/themes';

import { AppContent } from './app-content';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';

export async function AppLayout({ children }: PropsWithChildren) {
  let appHeader = <AppHeader variant="guest" />;

  if (await getIsAuthenticated()) {
    const account = await fetchAccount();

    appHeader = (
      <AppHeader
        user={{
          avatarURL: account.avatar_url || '',
          credits: account.ai_credit || 0,
          username: account.display_name || '',
        }}
        variant="authenticated"
      />
    );
  }

  return (
    <Flex
      direction="column"
      style={{
        minHeight: '100vh',
      }}
    >
      <header className="sticky">{appHeader}</header>

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
