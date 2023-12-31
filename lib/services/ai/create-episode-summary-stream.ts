import type { Tables } from '@/types/supabase/database';
import type { OpenAI } from 'openai';

import { OpenAIStream } from 'ai';
import { promptTokensEstimate } from 'openai-chat-tokens';

import { incrementAccountAICredits } from '../account';
import { saveEpisodeContentSummary } from '../episode-content';
import { openai } from './openai';

function getModel(
  estimatedTokens: number,
): OpenAI.Chat.Completions.ChatCompletionCreateParams['model'] {
  switch (true) {
    case estimatedTokens < 16000:
      return 'gpt-3.5-turbo-16k-0613';

    default:
      return 'gpt-4-1106-preview';
  }
}

export async function createEpisodeSummaryStream({
  episode,
  transcription,
}: {
  episode: Pick<Tables<'episode'>, 'id' | 'title'>;
  transcription: string;
}) {
  try {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        content: `
        Summarize the following transcription of the podcast episode "${episode.title}" by following these guidelines:
          - Skip the ads and intro.
          - Use paragraphs or bullet point lists.
          - Prefer short, clean sentences.
          - Write the summary in the same language as the transcription.
      `,
        role: 'system',
      },
      {
        content: transcription,
        role: 'system',
      },
    ];

    const response = await openai.chat.completions.create({
      messages,
      model: getModel(promptTokensEstimate({ messages })),
      stream: true,
    });

    return OpenAIStream(response, {
      onCompletion: async (completion) => {
        await saveEpisodeContentSummary(episode.id, completion);
      },
    });
  } catch (error) {
    await incrementAccountAICredits();
    throw error;
  }
}
