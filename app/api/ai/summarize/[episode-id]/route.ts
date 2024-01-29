import {
  DatabaseError,
  HttpBadRequestError,
  HttpInternalServerError,
} from '@/lib/errors';
import { createEpisodeSummaryStream } from '@/lib/services/ai/create-episode-summary-stream';
import { createSupabaseServerClient } from '@/lib/services/supabase/server';
import { StreamingTextResponse } from 'ai';
import { cookies } from 'next/headers';

// export const runtime = 'edge';

export async function POST(
  req: Request,
  { params }: { params: { 'episode-id': string } },
) {
  const episodeId = parseInt(params['episode-id'], 10);

  const { data, error } = await createSupabaseServerClient(cookies())
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

  const stream = await createEpisodeSummaryStream({
    episode: {
      id: episodeId,
      title: data.episode?.title ?? '',
    },
    transcription: data.transcription,
  });

  return new StreamingTextResponse(stream);
}
