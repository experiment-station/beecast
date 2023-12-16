import type { PropsWithChildren } from 'react';

import { Box } from '@radix-ui/themes';

export function PreWrap(props: PropsWithChildren) {
  return <Box style={{ whiteSpace: 'pre-wrap' }}>{props.children}</Box>;
}
