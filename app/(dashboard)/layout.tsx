import type { PropsWithChildren } from 'react';

import { AppLayout } from '@/components/layout/app-layout';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>;
}
