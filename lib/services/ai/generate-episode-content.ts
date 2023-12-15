import type { Tables } from '@/types/supabase/database';

import { DatabaseError } from '@/lib/errors';

import {
  getAccountId,
  updateAccountAICredits,
  validateAccountAICredits,
} from '../account';
import { createSupabaseServiceClient } from '../supabase/service';
import { transcribeAudio } from './deepgram';
import { summarizeEpisodeTranscript } from './openai';

export const generateEpisodeContent = async ({
  episodeId,
}: {
  episodeId: Tables<'episode'>['id'];
}) => {
  const initialAiCredits = await validateAccountAICredits();
  const updatedAiCredits = await updateAccountAICredits(initialAiCredits - 1);

  try {
    const supabase = createSupabaseServiceClient();

    const episodeQuery = await supabase
      .from('episode')
      .select('title, audio_url')
      .eq('id', episodeId)
      .single();

    if (episodeQuery.error) {
      throw new DatabaseError(episodeQuery.error);
    }

    const transcript = await transcribeAudio({
      fileURL: episodeQuery.data.audio_url,
    });

    const summary = await summarizeEpisodeTranscript({
      title: episodeQuery.data.title,
      transcript,
    });

    const { data, error } = await supabase
      .from('episode_content')
      .upsert(
        {
          account: await getAccountId(),
          episode: episodeId,
          text_summary: summary,
          transcription: transcript,
        },
        {
          onConflict: 'episode',
        },
      )
      .select('*')
      .single();

    if (error) {
      throw new DatabaseError(error);
    }

    return data;
  } catch (error) {
    await updateAccountAICredits(updatedAiCredits + 1);
    throw error;
  }
};
