import { env } from '@/env.mjs';
import { createClient as createDeepgramClient } from '@deepgram/sdk';
import { z } from 'zod';

const deepgram = createDeepgramClient(env.DEEPGRAM_API_KEY);

export const transcribeAudio = async ({ fileURL }: { fileURL: string }) => {
  const { result } = await deepgram.listen.prerecorded.transcribeUrl(
    {
      url: fileURL,
    },
    {
      model: 'nova-2',
      paragraphs: true,
      smart_format: true,
    },
  );

  const transcriptSchema = z.object({
    results: z.object({
      channels: z.array(
        z.object({
          alternatives: z.array(
            z.object({
              transcript: z.string(),
            }),
          ),
        }),
      ),
    }),
  });

  const validatedTranscript = transcriptSchema.safeParse(result);

  if (!validatedTranscript.success) {
    throw validatedTranscript.error;
  }

  return validatedTranscript.data.results.channels[0].alternatives[0]
    .transcript;
};
