import type { PropsWithChildren } from 'react';

import { Theme } from '@radix-ui/themes';

export function RadixThemesProvider({ children }: PropsWithChildren) {
  return (
    <Theme accentColor="amber" appearance="dark" grayColor="sand">
      {children}
    </Theme>
  );
}
