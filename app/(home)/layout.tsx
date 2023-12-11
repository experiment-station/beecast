import type { PropsWithChildren } from 'react';

import { AppLayout } from '@/components/layout/app-layout';

export default function HomeLayout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
