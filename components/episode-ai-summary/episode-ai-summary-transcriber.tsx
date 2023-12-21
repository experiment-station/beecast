'use client';

import { Callout, Text } from '@radix-ui/themes';
import formatDuration from 'format-duration';
import { useEffect, useState } from 'react';
import { MdOutlineTextsms } from 'react-icons/md';

import { EpisodeAISummaryPlaceholder } from './episode-ai-summary-placeholder';

export function EpisodeAISummaryTranscriber() {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(timeElapsed);

  return (
    <EpisodeAISummaryPlaceholder>
      <Callout.Root color="gray" size="1">
        <Callout.Icon>
          <MdOutlineTextsms />
        </Callout.Icon>

        <Callout.Text>
          <Text weight="medium">
            Transcribing episode (this takes approximately 15 seconds)
          </Text>
          <br />
          <Text size="2">{formatDuration(timeElapsed * 1000)}</Text>
        </Callout.Text>
      </Callout.Root>
    </EpisodeAISummaryPlaceholder>
  );
}
