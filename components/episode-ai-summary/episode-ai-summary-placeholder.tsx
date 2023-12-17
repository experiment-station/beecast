import type { PropsWithChildren } from 'react';

import { FAKE_EPISODE_SUMMARY } from '@/lib/fixtures/fake-episode-summary';
import { Box, Flex } from '@radix-ui/themes';

import { CollapsiblePanel } from '../ui/collapsible-panel';

export function EpisodeAISummaryPlaceholder(props: PropsWithChildren) {
  return (
    <CollapsiblePanel title="Episode summary">
      {FAKE_EPISODE_SUMMARY}

      <Flex
        align="center"
        height="100%"
        justify="center"
        left="0"
        position="absolute"
        style={{
          backdropFilter: 'blur(3px)',
          zIndex: 1,
        }}
        top="0"
        width="100%"
      >
        <Box
          style={{
            backgroundColor: 'var(--color-page-background)',
            borderRadius: 'var(--radius-3)',
            overflow: 'hidden',
          }}
        >
          {props.children}
        </Box>
      </Flex>
    </CollapsiblePanel>
  );
}
