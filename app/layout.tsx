import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { AppLayout } from '@/components/layout/app-layout';
import { ThemeProvider } from '@/components/theme-provider';
import '@/components/theme-provider/styles.css';

export const metadata: Metadata = {
  description: 'Welcome, welcome, welcome!',
  title: 'beecast',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
