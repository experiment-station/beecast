import type { PropsWithChildren } from 'react';

import { Theme } from '@radix-ui/themes';

export function RadixThemesProvider({ children }: PropsWithChildren) {
  return (
    <Theme accentColor="gray" appearance="dark">
      {children}
    </Theme>
  );
}
