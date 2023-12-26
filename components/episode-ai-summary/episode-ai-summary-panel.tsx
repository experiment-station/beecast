import type { PropsWithChildren } from 'react';

import { Badge, Flex } from '@radix-ui/themes';
import { VscSparkle } from 'react-icons/vsc';

import { CollapsiblePanel } from '../ui/collapsible-panel';
import { Panel } from '../ui/panel';
import { PreWrap } from '../ui/pre-wrap';

type Props = PropsWithChildren<{
  variant?: 'collapsible' | 'default';
}>;

function Title() {
  return (
    <Flex align="center" gap="2">
      <Badge
        color="mint"
        size="1"
        style={{
          marginBottom: '-1px',
        }}
      >
        <VscSparkle />
        AI
      </Badge>

      <span>Episode summary</span>
    </Flex>
  );
}

export function EpisodeAISummaryPanel({
  children,
  variant = 'default',
}: Props) {
  return variant === 'collapsible' ? (
    <CollapsiblePanel title={<Title />}>
      <PreWrap>{children}</PreWrap>
    </CollapsiblePanel>
  ) : (
    <Panel title={<Title />}>
      <PreWrap>{children}</PreWrap>
    </Panel>
  );
}
