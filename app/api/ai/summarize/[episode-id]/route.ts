import {
  DatabaseError,
  HttpBadRequestError,
  HttpInternalServerError,
} from '@/lib/errors';
import { openai } from '@/lib/services/ai/openai';
import { saveEpisodeContentSummary } from '@/lib/services/episode-content';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function POST(
  req: Request,
  { params }: { params: { 'episode-id': string } },
) {
  const episodeId = parseInt(params['episode-id'], 10);

  const supabase = createSupabaseServerClient(cookies());

  const { data, error } = await supabase
    .from('episode_content')
    .select('transcription, episode(title)')
    .eq('episode', episodeId)
    .single();

  if (error) {
    return new HttpInternalServerError({
      error: new DatabaseError(error),
    }).toNextResponse();
  }

  if (!data.transcription) {
    return new HttpBadRequestError({
      message: 'Episode has no transcription',
    }).toNextResponse();
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        content: `Summarize the following transcription from ${data.episode?.title} episode of the podcast`,
        role: 'system',
      },
      {
        content: data.transcription,
        role: 'system',
      },
    ],
    model: 'gpt-4-1106-preview',
    stream: true,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      await saveEpisodeContentSummary(episodeId, completion);
    },
  });

  return new StreamingTextResponse(stream);
}
