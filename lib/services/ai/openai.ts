import { env } from '@/env.mjs';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const summarizeEpisodeTranscript = async ({
  title,
  transcript,
}: {
  title: string;
  transcript: string;
}) => {
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
