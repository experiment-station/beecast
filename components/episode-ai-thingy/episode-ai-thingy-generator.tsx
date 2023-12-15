'use client';

import type { Tables } from '@/types/supabase/database';

import { FAKE_EPISODE_SUMMARY } from '@/lib/fixtures/fake-episode-summary';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useMemo } from 'react';
import { CgDollar } from 'react-icons/cg';
import { PiRobotBold } from 'react-icons/pi';

import { CollapsiblePanel } from '../ui/collapsible-panel';
import { useEpisodeContentGenerator } from './use-episode-content-generator';

type Props = {
  credits: number;
  id: Tables<'episode'>['id'];
};

export function EpisodeAIThingyGenerator({ credits, id }: Props) {
  const [state, generate] = useEpisodeContentGenerator({
    id,
  });

  const generationButtonText = useMemo(() => {
    switch (state.status) {
      case 'countdown':
        return state.timeRemaining === 0
          ? `THERE YOU GO!`
          : `Presenting the AI thingy in ${state.timeRemaining} seconds...`;
      case 'error':
        return 'Error';
      case 'idle':
        return 'Do the AI thingy!';
      case 'loading':
        return 'Doing the AI thingy...';
      case 'success':
        return 'Done!';
    }
  }, [state]);

  const actionButton = useMemo(() => {
    if (credits < 1) {
      return (
        <Button asChild highContrast>
          <Link href="/credits">
            <CgDollar /> Buy credits to summarize this episode
          </Link>
        </Button>
      );
    }

    return (
      <Button highContrast onClick={generate} size="2">
        <Flex align="center" gap="2" justify="center">
          <Text mt="1" trim="both">
            <PiRobotBold />
          </Text>

          <Text
            style={{
              textTransform: 'uppercase',
            }}
            weight="medium"
          >
            {generationButtonText}
          </Text>
        </Flex>
      </Button>
    );
  }, [credits, generate, generationButtonText]);

  return (
    <Box>
      <CollapsiblePanel
        open={state.status === 'success'}
        title="Episode summary"
      >
        {state.status === 'success' ? (
          <Box
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {state.data}
          </Box>
        ) : (
          FAKE_EPISODE_SUMMARY
        )}

        {state.status === 'success' ? null : (
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
            {actionButton}
          </Flex>
        )}
      </CollapsiblePanel>
    </Box>
  );
}
