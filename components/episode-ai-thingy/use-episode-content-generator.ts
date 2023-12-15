'use client';

import type { Tables } from '@/types/supabase/database';

import { generateEpisodeContent } from '@/lib/services/ai/generate-episode-content';
import { useState } from 'react';

type Params = {
  id: Tables<'episode'>['id'];
};

type State =
  | {
      data: string;
      status: 'success';
    }
  | {
      error: unknown;
      status: 'error';
    }
  | {
      status: 'idle';
    }
  | {
      status: 'loading';
    };

export function useEpisodeContentGenerator({ id }: Params) {
  const [state, setState] = useState<State>({ status: 'idle' });

  const run = async () => {
    setState({ status: 'loading' });

    try {
      const episodeContent = await generateEpisodeContent({ episodeId: id });

      setState({
        data: episodeContent.text_summary ?? '',
        status: 'success',
      });
    } catch (error) {
      setState({ error, status: 'error' });
    }
  };

  return [state, run] as const;
}
