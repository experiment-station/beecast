import { env } from '@/env.mjs';
import { createClient as createDeepgramClient } from '@deepgram/sdk';

const transcribeAudio = async (fileURL: string) => {
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
