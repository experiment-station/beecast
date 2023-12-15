import type { PropsWithChildren } from 'react';

import { Card, Heading, Text } from '@radix-ui/themes';

type Props = PropsWithChildren<{
  title: string;
}>;

export function Panel({ children, title }: Props) {
  return (
    <Card>
      <Heading mb="2" size="2">
        {title}
      </Heading>

      <Text color="gray" size="2">
        {children}
      </Text>
    </Card>
  );
}
