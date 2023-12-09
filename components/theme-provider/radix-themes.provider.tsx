import type { PropsWithChildren } from 'react';

import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export function RadixThemesProvider({ children }: PropsWithChildren) {
  return (
    <Theme>
      {children}
      <ThemePanel />
    </Theme>
  );
}
