'use client';

import type { Tables } from '@/types/supabase/database';

import {
  updateAccountAICredits,
  validateAccountAICredits,
} from '@/lib/services/account';
import { transcribeEpisode } from '@/lib/services/ai/transcribe-episode';
import { Box, Button, Callout, Flex, Text } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { PiRobotBold } from 'react-icons/pi';

import { CollapsiblePanel } from '../ui/collapsible-panel';
import { EpisodeAIThingyPlaceholder } from './episode-ai-thingy-placeholder';

type State =
  | {
      message: string;
      status: 'error';
    }
  | {
      status: 'idle';
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
      setState({ message: 'Not enough credits.', status: 'error' });
    }

    try {
      setState({ status: 'transcribing' });
      const transcription = await transcribeEpisode(id);
      setState({ status: 'summarizing', transcription });
    } catch (error) {
      await updateAccountAICredits(updatedAiCredits + 1);
      setState({ message: 'Failed to transcribe episode', status: 'error' });
    }
  }, [id]);

  switch (state.status) {
    case 'summarizing':
      return (
        <CollapsiblePanel open title="Episode transcription">
          <Box style={{ whiteSpace: 'pre-wrap' }}>{state.transcription}</Box>
        </CollapsiblePanel>
      );

    case 'error':
      return (
        <EpisodeAIThingyPlaceholder>
          <Callout.Root color="red" role="alert" size="1">
            <Callout.Icon>
              <FaExclamationTriangle />
            </Callout.Icon>

            <Callout.Text>{state.message}</Callout.Text>
          </Callout.Root>
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
