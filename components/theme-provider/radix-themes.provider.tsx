import type { PropsWithChildren } from 'react';

import { Theme, ThemePanel } from '@radix-ui/themes';

export function RadixThemesProvider({ children }: PropsWithChildren) {
  return (
    <Theme>
      {children}
      <ThemePanel />
    </Theme>
  );
}
