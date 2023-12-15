import type { OpenAI } from 'openai';

import { openai } from '@/lib/services/ai/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: OpenAI.Chat.ChatCompletionCreateParamsStreaming['messages'];
  };

  const response = await openai.chat.completions.create({
    messages,
    model: 'gpt-4-1106-preview',
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
