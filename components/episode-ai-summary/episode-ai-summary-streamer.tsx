'use client';

import type { Tables } from '@/types/supabase/database';

import { Flex } from '@radix-ui/themes';
import { useChat } from 'ai/react';
import React, { useEffect, useRef, useState } from 'react';

import { EpisodeAISummaryFooter } from './episode-ai-summary-footer';
import { EpisodeAISummaryPanel } from './episode-ai-summary-panel';

type Props = {
  id: Tables<'episode'>['id'];
};

export function EpisodeAISummaryStreamer({ id }: Props) {
  const startedRef = useRef(false);
  const [finished, setFinished] = useState(false);

  const { messages, reload, setMessages } = useChat({
    api: `/api/ai/summarize/${id}`,
    onFinish: () => {
      setFinished(true);
    },
  });

  useEffect(() => {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;
    setMessages([{ content: '', id: 'user', role: 'user' }]);
    void reload();
  }, [reload, setMessages]);

  const assistantMessages = messages.filter((m) => m.role === 'assistant');

  return (
    <Flex direction="column" gap="2">
      <EpisodeAISummaryPanel>
        {assistantMessages.length === 0
          ? 'Summarizing episode...'
          : assistantMessages.map((message) => (
              <React.Fragment key={message.id}>
                {message.content}
              </React.Fragment>
            ))}
      </EpisodeAISummaryPanel>

      {finished ? <EpisodeAISummaryFooter id={id} /> : null}
    </Flex>
  );
}
