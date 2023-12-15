'use client';

import { useEffect, useState } from 'react';

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

export function withClientOnly<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
) {
  return function ClientOnlyWrapper(props: T) {
    return (
      <ClientOnly>
        <Component {...props} />
      </ClientOnly>
    );
  };
}
