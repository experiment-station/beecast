import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { Theme, ThemePanel } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const metadata: Metadata = {
  description: 'Welcome, welcome, welcome!',
  title: 'pod1612',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Theme>
            {children}
            <ThemePanel />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
