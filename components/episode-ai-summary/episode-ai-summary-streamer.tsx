'use client';

import type { Tables } from '@/types/supabase/database';

import { useChat } from 'ai/react';
import React, { useEffect, useRef } from 'react';

type Props = {
  id: Tables<'episode'>['id'];
};

export function EpisodeAISummaryStreamer({ id }: Props) {
  const startedRef = useRef(false);

  const { messages, reload, setMessages } = useChat({
    api: `/api/ai/summarize/${id}`,
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

  if (assistantMessages.length === 0) {
    return 'Summarizing episode...';
  }

  return (
    <>
      {assistantMessages.map((message) => (
        <React.Fragment key={message.id}>{message.content}</React.Fragment>
      ))}
    </>
  );
}
