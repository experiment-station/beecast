import type { Tables } from '@/types/supabase/database';

import { env } from '@/env.mjs';
import { createClient as createDeepgramClient } from '@deepgram/sdk';
import { OpenAI } from 'openai';

import {
  getAccountId,
  updateAccountAICredits,
  validateAccountAICredits,
} from './account';
import { createSupabaseServiceClient } from './supabase/service';

const transcribeAudio = async ({ fileURL }: { fileURL: string }) => {
  const deepgram = createDeepgramClient(env.DEEPGRAM_API_KEY);

  const { result } = await deepgram.listen.prerecorded.transcribeUrl(
    {
      url: fileURL,
    },
    {
      diarize: true,
      model: 'nova-2',
      smart_format: true,
    },
  );

  const transcript = result?.results.channels[0]?.alternatives[0]?.transcript;

  if (!transcript) {
    throw new Error('No transcript found');
  }

  return transcript;
};

const summarizeTranscript = async ({
  title,
  transcript,
}: {
  title: string;
  transcript: string;
}) => {
  const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

  const response = await openai.chat.completions.create({
    messages: [
      {
        content: `Summarize the following transcript from a podcast episode titled as ${title}`,
        role: 'system',
      },
      {
        content: transcript,
        role: 'system',
      },
    ],
    model: 'gpt-3.5-turbo-1106',
  });

  return response.choices[0].message.content;
};

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

    const summary = await summarizeTranscript({
      title: episodeQuery.data.title,
      transcript,
    });

    const createEpisodeContentQuery = await supabase
      .from('episode_content')
      .upsert({
        episode: episodeId,
        text_summary: summary,
        transcription: transcript,
        user: await getAccountId(),
      })
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
