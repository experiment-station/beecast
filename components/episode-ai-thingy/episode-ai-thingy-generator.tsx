'use client';

import type { Tables } from '@/types/supabase/database';

import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { PiRobotBold } from 'react-icons/pi';

import { CollapsiblePanel } from '../ui/collapsible-panel';
import { EpisodeAIThingyPlaceholder } from './episode-ai-thingy-placeholder';
import { useEpisodeContentGenerator } from './use-episode-content-generator';

export function EpisodeAIThingyGenerator({
  id,
}: {
  id: Tables<'episode'>['id'];
}) {
  const [state, generate] = useEpisodeContentGenerator({
    id,
  });

  if (state.status !== 'success') {
    let buttonText = 'Do the AI thingy!';

    switch (state.status) {
      case 'error':
        buttonText = 'Try again';
        break;

      case 'idle':
        buttonText = 'Do the AI thingy!';
        break;

      case 'loading':
        buttonText = 'Doing the AI thingy...';
        break;
    }

    return (
      <EpisodeAIThingyPlaceholder>
        <Button highContrast onClick={generate} size="2">
          <Flex align="center" gap="2" justify="center">
            <Text mt="1" trim="both">
              <PiRobotBold />
            </Text>

            <Text style={{ textTransform: 'uppercase' }} weight="medium">
              {buttonText}
            </Text>
          </Flex>
        </Button>
      </EpisodeAIThingyPlaceholder>
    );
  }

  return (
    <CollapsiblePanel open title="Episode summary">
      <Box style={{ whiteSpace: 'pre-wrap' }}>{state.data}</Box>
    </CollapsiblePanel>
  );
}
