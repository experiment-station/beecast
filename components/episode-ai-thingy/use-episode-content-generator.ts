'use client';

import type { Tables } from '@/types/supabase/database';

import { generateEpisodeContent } from '@/lib/services/ai/generate-episode-content';
import { useEffect, useState } from 'react';

type Params = {
  id: Tables<'episode'>['id'];
};

type State =
  | {
      data: string;
      status: 'countdown';
      timeRemaining: number;
    }
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
        status: 'countdown',
        timeRemaining: 3,
      });
    } catch (error) {
      setState({ error, status: 'error' });
    }
  };

  useEffect(() => {
    switch (state.status) {
      case 'countdown': {
        const interval = setInterval(() => {
          setState((_state) => {
            if (_state.status !== 'countdown') {
              return _state;
            }

            if (_state.timeRemaining <= 0) {
              return { ..._state, status: 'success' };
            }

            return { ..._state, timeRemaining: _state.timeRemaining - 1 };
          });
        }, 1000);

        return () => {
          clearInterval(interval);
        };
      }

      default:
        break;
    }
  }, [state]);

  return [state, run] as const;
}
