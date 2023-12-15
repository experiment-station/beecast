import type { PropsWithChildren } from 'react';

import { Text } from '@radix-ui/themes';

import styles from './line-clamp.module.css';

export function LineClamp({ children }: PropsWithChildren) {
  return <Text className={styles.Container}>{children}</Text>;
}
