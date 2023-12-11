import type { PropsWithChildren } from 'react';

import { Flex } from '@radix-ui/themes';

export default function AuthLayout(props: PropsWithChildren) {
  return (
    <Flex
      direction="column"
      gap="4"
      mx="auto"
      style={{
        alignItems: 'center',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      {props.children}
    </Flex>
  );
}
