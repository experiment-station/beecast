'use client';

import type { Responsive } from '@radix-ui/themes';
import type { PropsWithChildren } from 'react';

import { Dialog } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function RouteModal({
  children,
  size = '3',
}: PropsWithChildren<{
  size?: Responsive<'1' | '2' | '3' | '4'>;
}>) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Dialog.Root defaultOpen>
      <Dialog.Content
        onEscapeKeyDown={onDismiss}
        onPointerDownOutside={onDismiss}
        size={size}
      >
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
