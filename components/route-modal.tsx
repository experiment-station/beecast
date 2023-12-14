'use client';

import type { PropsWithChildren } from 'react';

import { Dialog } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function RouteModal({ children }: PropsWithChildren) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Dialog.Root defaultOpen>
      <Dialog.Content
        onEscapeKeyDown={onDismiss}
        onPointerDownOutside={onDismiss}
      >
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
