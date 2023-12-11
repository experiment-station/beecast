import { env } from '@/env.mjs';
import { createClient as createDeepgramClient } from '@deepgram/sdk';
import { OpenAI } from 'openai';

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

const summarizeTranscript = async (transcript: string) => {
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    messages: [
      {
        content: 'Summarize the following transcript:',
        role: 'system',
      },
      {
        content: transcript,
        role: 'system',
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return response.choices[0].message.content;
};
