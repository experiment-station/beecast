'use server';

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

    const transcribeStart = performance.now();
    console.log('Transcribing audio...');
    const transcript = await transcribeAudio({
      fileURL: episodeQuery.data.audio_url,
    });
    const transcribeEnd = performance.now();
    console.log(
      `Transcription completed in ${transcribeEnd - transcribeStart}ms.`,
    );

    const summaryStart = performance.now();
    console.log('Summarizing transcript...');
    const summary = await summarizeEpisodeTranscript({
      title: episodeQuery.data.title,
      transcript,
    });
    const summaryEnd = performance.now();
    console.log(`Summarization completed in ${summaryEnd - summaryStart}ms.`);

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
