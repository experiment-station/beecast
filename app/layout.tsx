import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const metadata: Metadata = {
  description: 'Welcome, welcome, welcome!',
  title: 'pod1612',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Theme>
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
