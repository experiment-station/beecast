import type { PropsWithChildren } from 'react';

import { CollapsiblePanel } from '../ui/collapsible-panel';
import { Panel } from '../ui/panel';
import { PreWrap } from '../ui/pre-wrap';

type Props = PropsWithChildren<{
  variant?: 'collapsible' | 'default';
}>;

export function EpisodeAISummaryPanel({
  children,
  variant = 'default',
}: Props) {
  return variant === 'collapsible' ? (
    <CollapsiblePanel title="Episode summary">
      <PreWrap>{children}</PreWrap>
    </CollapsiblePanel>
  ) : (
    <Panel title="Episode summary">
      <PreWrap>{children}</PreWrap>
    </Panel>
  );
}
