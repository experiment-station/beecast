'use client';

import type { Tables } from '@/types/supabase/database';

import {
  updateAccountAICredits,
  validateAccountAICredits,
} from '@/lib/services/account';
import { transcribeEpisode } from '@/lib/services/ai/transcribe-episode';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { PiRobotBold } from 'react-icons/pi';

import { CollapsiblePanel } from '../ui/collapsible-panel';
import { EpisodeAIThingyPlaceholder } from './episode-ai-thingy-placeholder';

type State =
  | {
      reason: string;
      status: 'error';
    }
  | {
      status: 'idle';
    }
  | {
      status: 'success';
      summary: string;
      transcription: string;
    }
  | {
      status: 'summarizing';
      transcription: string;
    }
  | {
      status: 'transcribing';
    };

export function EpisodeAIThingyGenerator({
  id,
}: {
  id: Tables<'episode'>['id'];
}) {
  const [state, setState] = useState<State>({ status: 'idle' });

  const generate = useCallback(async () => {
    let updatedAiCredits = 0;

    try {
      const initialAiCredits = await validateAccountAICredits();
      updatedAiCredits = await updateAccountAICredits(initialAiCredits - 1);
    } catch (error) {
      setState({ reason: 'Not enough credits.', status: 'error' });
    }

    try {
      setState({ status: 'transcribing' });

      const transcription = await transcribeEpisode(id);
      setState({ status: 'summarizing', transcription });
    } catch (error) {
      await updateAccountAICredits(updatedAiCredits + 1);
      setState({ reason: 'idk', status: 'error' });
    }
  }, [id]);

  switch (state.status) {
    case 'success':
      return (
        <CollapsiblePanel open title="Episode summary">
          <Box style={{ whiteSpace: 'pre-wrap' }}>{state.summary}</Box>
        </CollapsiblePanel>
      );

    case 'summarizing':
      return (
        <CollapsiblePanel open title="Episode transcription">
          <Box style={{ whiteSpace: 'pre-wrap' }}>{state.transcription}</Box>
        </CollapsiblePanel>
      );

    case 'error':
      return (
        <EpisodeAIThingyPlaceholder>
          <Text>Failed {state.reason}</Text>
        </EpisodeAIThingyPlaceholder>
      );

    default:
      return (
        <EpisodeAIThingyPlaceholder>
          <Button highContrast onClick={generate} size="2">
            <Flex align="center" gap="2" justify="center">
              <Text mt="1" trim="both">
                <PiRobotBold />
              </Text>

              <Text style={{ textTransform: 'uppercase' }} weight="medium">
                {state.status}
              </Text>
            </Flex>
          </Button>
        </EpisodeAIThingyPlaceholder>
      );
  }
}
