import type { Tables } from '@/types/supabase/database';

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
      throw new Error(episodeQuery.error.message);
    }

    const transcript = await transcribeAudio({
      fileURL: episodeQuery.data.audio_url,
    });

    const summary = await summarizeEpisodeTranscript({
      title: episodeQuery.data.title,
      transcript,
    });

    const createEpisodeContentQuery = await supabase
      .from('episode_content')
      .upsert(
        {
          episode: episodeId,
          text_summary: summary,
          transcription: transcript,
          user: await getAccountId(),
        },
        {
          onConflict: 'episode',
        },
      )
      .select('*')
      .single();

    if (createEpisodeContentQuery.error) {
      throw new Error(createEpisodeContentQuery.error.message);
    }

    return createEpisodeContentQuery.data;
  } catch (error) {
    await updateAccountAICredits(updatedAiCredits + 1);
    throw error;
  }
};
