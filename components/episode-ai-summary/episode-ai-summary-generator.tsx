'use client';

import type { Tables } from '@/types/supabase/database';

import { transcribeEpisode } from '@/lib/services/ai/transcribe-episode';
import { Button, Callout, Flex, Text } from '@radix-ui/themes';
import { useCallback, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { PiRobotBold } from 'react-icons/pi';

import { EpisodeAISummaryPlaceholder } from './episode-ai-summary-placeholder';
import { EpisodeAISummaryStreamer } from './episode-ai-summary-streamer';
import { EpisodeAISummaryTranscriber } from './episode-ai-summary-transcriber';

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
    }
  | {
      status: 'transcribing';
    };

export function EpisodeAISummaryGenerator({
  id,
}: {
  id: Tables<'episode'>['id'];
}) {
  const [state, setState] = useState<State>({ status: 'idle' });

  const generate = useCallback(async () => {
    try {
      setState({ status: 'transcribing' });
      await transcribeEpisode(id);
      setState({ status: 'summarizing' });
    } catch (error) {
      setState({ message: 'Failed to transcribe episode', status: 'error' });
    }
  }, [id]);

  switch (state.status) {
    case 'idle':
      return (
        <EpisodeAISummaryPlaceholder>
          <Button highContrast onClick={generate} size="2">
            <Flex align="center" gap="2" justify="center">
              <Text mt="1" size="4" trim="both">
                <PiRobotBold />
              </Text>

              <Text style={{ textTransform: 'uppercase' }} weight="medium">
                Do the AI thingy!
              </Text>
            </Flex>
          </Button>
        </EpisodeAISummaryPlaceholder>
      );

    case 'transcribing':
      return <EpisodeAISummaryTranscriber />;

    case 'summarizing':
      return <EpisodeAISummaryStreamer id={id} />;

    case 'error':
      return (
        <EpisodeAISummaryPlaceholder>
          <Callout.Root color="red" role="alert" size="1">
            <Callout.Icon>
              <FaExclamationTriangle />
            </Callout.Icon>

            <Callout.Text>{state.message}</Callout.Text>
          </Callout.Root>
        </EpisodeAISummaryPlaceholder>
      );
  }
}
