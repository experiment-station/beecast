import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import '@/components/theme-provider/styles.css';

export const metadata: Metadata = {
  description: 'Your hard-working AI podcast companion.',
  title: 'beecast',
};

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<{
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
