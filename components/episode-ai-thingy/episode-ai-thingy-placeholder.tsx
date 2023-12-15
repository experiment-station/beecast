import type { PropsWithChildren } from 'react';

import { FAKE_EPISODE_SUMMARY } from '@/lib/fixtures/fake-episode-summary';
import { Flex } from '@radix-ui/themes';

import { CollapsiblePanel } from '../ui/collapsible-panel';

export function EpisodeAIThingyPlaceholder(props: PropsWithChildren) {
  return (
    <CollapsiblePanel open={false} title="Episode summary">
      {FAKE_EPISODE_SUMMARY}

      <Flex
        align="center"
        height="100%"
        justify="center"
        left="0"
        position="absolute"
        style={{ backdropFilter: 'blur(3px)', borderRadius: 10, zIndex: 1 }}
        top="0"
        width="100%"
      >
        {props.children}
      </Flex>
    </CollapsiblePanel>
  );
}
