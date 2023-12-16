import { env } from '@/env.mjs';
import { createClient as createDeepgramClient } from '@deepgram/sdk';
import { z } from 'zod';

const deepgram = createDeepgramClient(env.DEEPGRAM_API_KEY);

export const transcribeAudio = async ({
  language = 'en',
  url,
}: {
  language?: string;
  url: string;
}) => {
  const { error, result } = await deepgram.listen.prerecorded.transcribeUrl(
    {
      url,
    },
    {
      language,
      model: language === 'en' ? 'nova-2' : 'base',
      paragraphs: true,
      smart_format: true,
    },
  );

  if (error) {
    throw error;
  }

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
