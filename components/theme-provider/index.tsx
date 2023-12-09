import type { PropsWithChildren } from 'react';

import { NextThemesProvider } from './next-themes-provider';
import { RadixThemesProvider } from './radix-themes.provider';

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider>
      <RadixThemesProvider>{children}</RadixThemesProvider>
    </NextThemesProvider>
  );
}
