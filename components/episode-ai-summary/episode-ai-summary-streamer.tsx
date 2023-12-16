import type { Tables } from '@/types/supabase/database';

import { saveEpisodeContentSummary } from '@/lib/services/episode-content';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

type Props = {
  id: Tables<'episode'>['id'];
  title: Tables<'episode'>['title'];
  transcription: string;
};

export function EpisodeAISummaryStreamer({ id, title, transcription }: Props) {
  const startedRef = useRef(false);

  const { messages, reload, setMessages } = useChat({
    api: '/api/ai/summarize',
    onFinish: (message) => {
      if (message.role === 'system') {
        return;
      }

      void saveEpisodeContentSummary(id, message.content);
    },
  });

  useEffect(() => {
    if (startedRef.current) {
      return;
    }

    startedRef.current = true;

    setMessages([
      {
        content: `Summarize the podcast episode titled '${title}' in a short paragraph.`,
        id: 'system-0',
        role: 'system',
      },
      {
        content: transcription,
        id: 'system-1',
        role: 'system',
      },
    ]);

    void reload();
  }, [reload, setMessages, title, transcription]);

  const summaryMessage = messages.find((message) => message.role !== 'system');

  return summaryMessage ? summaryMessage.content : 'Summarizing episode...';
}
